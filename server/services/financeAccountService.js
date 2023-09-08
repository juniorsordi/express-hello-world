var crypto = require('crypto');
const jwt = require("jsonwebtoken");
var fs = require("fs");
const moment = require("moment");
var parser = require('xml2json');
const ofx = require('ofx-convertjs');

const database = require("../infra/postgres");
//const ofx = require('../infra/ofx');

async function getContasBancarias(idEmpresa) {
    let SQL = `SELECT a.* 
        , coalesce( (select sum(valor_efetivo) from financas_movimentacao where id_conta_bancaria = a.id and tipo = 'D'), 0) as total_despesas
        , coalesce( (select sum(valor_efetivo) from financas_movimentacao where id_conta_bancaria = a.id and tipo = 'C'), 0) as total_receitas
        FROM financas_conta_bancaria2 a
        WHERE status = true and id_empresa = $1
        ORDER BY nome asc`;
    const data = await database.any(SQL,[idEmpresa]);
    return data;
}

async function getCategorias(idEmpresa) {
    const data = await database.any("SELECT * FROM financas_categoria WHERE id_empresa = $1 ORDER BY nome ASC", [idEmpresa]);
    return data;
}

async function getMovimentacoesPorConta(idConta, idEmpresa) {
    console.log([idConta, idEmpresa]);
    const data = await database.any("SELECT * FROM financas_movimentacao WHERE id_conta_bancaria = $1 AND id_empresa = $2 ORDER BY data_prevista, id ASC", [idConta, idEmpresa]);
    return data;
}

async function getDashboardCategorias(idConta, idEmpresa) {
    let SQL2 = `SELECT a.nome, coalesce(sum(b.valor),0) as total FROM financas_categoria a
        LEFT JOIN financas_movimentacao b ON (b.id_categoria = a.id)
        WHERE b.id_empresa = $2 AND b.id_conta_bancaria = $1 and b.tipo = 'D'
        GROUP by a.nome
        ORDER BY a.nome`;
    let SQL = `SELECT 
            a.nome
            , coalesce( (select sum(valor) from financas_movimentacao where id_categoria = a.id AND id_conta_bancaria = $1 and tipo = 'D'), 0) as total 
        FROM financas_categoria a
        WHERE id_empresa = $2 AND a.tipo = 'D'
        ORDER BY a.nome`;
    const data = await database.any(SQL, [idConta, idEmpresa]);
    return data;
}

async function saveAccount(fields) {
    let SQL = "INSERT INTO financas_conta_bancaria VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, 0, $8, 1) returning *";
    const info = await database.any(SQL, [
        fields.nome,
        fields.banco,
        fields.agencia,
        fields.conta,
        fields.tipo_conta,
        fields.limite,
        fields.saldo_inicial,
        fields.id_empresa
    ]);
    return info;
}

async function saveCategory(fields) {
    let SQL = "INSERT INTO financas_categoria VALUES (DEFAULT, $1, null, $2) returning *";
    const info = await database.any(SQL, [
        fields.nome,
        fields.id_empresa
    ]);
    return info;
}

async function saveAccountMoviment(fields, idEmpresa) {
    //console.log(fields);
    let hoje = moment().toISOString();
    let diff = moment(fields.data_vencimento).diff(hoje, 'days');
    let valor = fields.valor;
    let tipo_operacao = 'D';
    if(fields.tipo_operacao == 1) {
        valor = valor * -1;
    } else {
        tipo_operacao = 'C';
    }
    let valor_previsto = valor;
    let data_baixa = null;
    if(diff < 0) {
        valor_efetivo = valor;
        situacao = 1;
        data_baixa = fields.data_vencimento;
    } else {
        valor_efetivo = null;
        situacao = 0;
    }
    let SQL = `INSERT INTO financas_movimentacao VALUES (DEFAULT, 
        $1, $2, $3, $4, $5, $6, $7, now(), $8, $9, $10, null, null, null, false, false, $11
    ) returning *`;
    //console.log(SQL);
    //return fields;
    return await database.one(SQL, [fields.titulo, fields.data_vencimento, valor, valor_previsto, valor_efetivo, tipo_operacao, 
        situacao, data_baixa, fields.id_conta_bancaria, fields.id_categoria, idEmpresa]);
}

async function testeOFX(idEmpresa) {
    const file = fs.readFileSync('extrato_202307.ofx', 'utf8')
    const data = ofx.toJson(file);
    const listaTransacoes = data.OFX.BANKMSGSRSV1.BANKTRANLIST.STMTTRN;
    let i = 0;
    listaTransacoes.map(function(item) {
        if(i == 0) {
            item.saldo = parseFloat(item.TRNAMT);
        } else {
            item.saldo = listaTransacoes[i-1].saldo + parseFloat(item.TRNAMT);
        }
        i++;
    });
    return listaTransacoes;
    return data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
}

module.exports = {
    getContasBancarias,
    getCategorias,
    getMovimentacoesPorConta,
    getDashboardCategorias,
    saveAccount,
    saveCategory,
    saveAccountMoviment,
    testeOFX,
    //addTaskProject,
}