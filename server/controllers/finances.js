const db = require("../infra/database");
var moment = require("moment");
var fs = require("fs");
const ofx = require('../infra/ofx');
var iconv = require('iconv-lite');

async function importofx(idEmpresa) {
    fs.readFile('extrato.ofx', 'binary', function (err, ofxData) {
        if (err) throw err;

        const data = ofx.parse(ofxData);
        //console.log(data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN);
        let transacoes = data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
        myString = JSON.parse(JSON.stringify(transacoes));
        //console.log(transacoes[0]);
        myString.map(function(item) {
            let trans_data = `${item.FITID.substr(0, 4)}-${item.FITID.substr(4, 2)}-${item.FITID.substr(6, 2)}`;
            let memo = iconv.decode(item.MEMO, "ISO-8859-1");
            //console.log([idEmpresa, item.REFNUM, item.TRNAMT, memo, trans_data]);
            db.one("INSERT INTO financas_ofx VALUES (null, ?, ?, ?, ?, ?, DATETIME('now'))", [idEmpresa, item.REFNUM, item.TRNAMT, memo, trans_data]);
        });
    });
}

async function relatorioOFX(idEmpresa) {
    let lista = await db.any("SELECT * FROM financas_ofx WHERE id_empresa = ? ORDER BY data_transacao ASC", [idEmpresa]);
    let saldo_inicial = lista[0].valor;
    let saldo_final = saldo_inicial;
    let memoria_calculo = 0;
    console.log([saldo_inicial, saldo_final, memoria_calculo])
    let i = 0;
    lista.map(function(item) {
        if(i > 0) {
            item.memoria_calculo = lista[i-1].memoria_calculo + item.valor;
        } else {
            item.memoria_calculo = memoria_calculo + item.valor;
        }
        
        //memoria_calculo = item.memoria_calculo;
        //console.log(memoria_calculo);
        i++;
    });
    return lista;
}

async function getDashboardAcounts(idEmpresa) {
    const data = await db.any(`SELECT nome as conta,
        (SELECT ifnull(sum(valor),0) FROM financas_contas_pagar WHERE forma_pagamento = a.id) as expenses
        , (SELECT ifnull(sum(valor),0) FROM financas_contas_receber WHERE forma_pagamento = a.id) as incomes
        FROM financas_forma_pagamento a WHERE id_empresa = ?
        ORDER BY 1 ASC;`, [idEmpresa]);
    return data;
}

async function getDashboardAcountsIncome(idEmpresa) {
    const data = await db.any(`SELECT nome as conta,
        (SELECT ifnull(sum(valor),0) FROM financas_contas_receber WHERE forma_pagamento = a.id) as total
        FROM financas_forma_pagamento a WHERE id_empresa = ?
        ORDER BY 1 ASC;`, [idEmpresa]);
    return data;
}

async function getContasPagar(idEmpresa) {
    const data = await db.any("SELECT * FROM financas_contas_pagar WHERE id_empresa = ? ORDER BY data_vencimento ASC", [idEmpresa]);
    return data;
}

async function getContasReceber(idEmpresa) {
    const data = await db.any("SELECT * FROM financas_contas_receber WHERE id_empresa = ? ORDER BY data_vencimento ASC", [idEmpresa]);
    return data;
}

async function getFormaspagamento(idEmpresa) {
    const data = await db.any("SELECT * FROM financas_forma_pagamento WHERE id_empresa = ? AND ativo = 1 ORDER BY nome ASC", [idEmpresa]);
    return data;
}

async function getCategoriasFinancas(idEmpresa) {
    const data = await db.any("SELECT * FROM financas_categoria WHERE id_empresa = ? ORDER BY nome ASC", [idEmpresa]);
    return data;
}

async function getCategoriasReportCards(idEmpresa, conta) {
    const data = await db.any(`SELECT a.nome, sum(b.valor) as total FROM financas_categoria a
        JOIN financas_contas_pagar b ON (b.id_categoria_financeiro = a.id)
        WHERE b.id_empresa = ? AND b.forma_pagamento = ?
        GROUP by a.nome`, [idEmpresa, conta]);
    return data;
}

async function getCashFlow(idEmpresa, params) {
    let filtro = "";
    if(params) {
        let { inicio, termino, conta } = params;
        filtro = ` AND data_vencimento BETWEEN '${inicio}' AND '${termino}'`;
        if(conta) {
            filtro += ` AND forma_pagamento = ${conta}`;
        }
    }
    const data = await db.any(`
        SELECT a.*, (a.valor) as valor2, strftime('%d/%m/%Y', a.data_vencimento) as data_vencimento2, '1' as type FROM financas_contas_receber a WHERE id_empresa = ? ${filtro}
        UNION 
        SELECT b.*, (b.valor * -1) as valor2, strftime('%d/%m/%Y', b.data_vencimento) as data_vencimento2, '2' as type FROM financas_contas_pagar b WHERE id_empresa = ? ${filtro}
        ORDER BY data_vencimento ASC
        
    `, [idEmpresa, idEmpresa]);
    return data;
}

async function savePayments(infos, idEmpresa) {
    //let data_vencto = infos.data_vencimento;
    return await db.any("INSERT INTO financas_contas_pagar VALUES (null, ?, ?, ?, ?, null, ?, ?, 0)", [idEmpresa, infos.titulo, infos.valor, infos.data_vencimento, infos.tipo_pagamento, infos.id_categoria])
}

async function saveReceipts(infos, idEmpresa) {
    //let data_vencto = infos.data_vencimento;
    return await db.any("INSERT INTO financas_contas_receber VALUES (null, ?, ?, ?, ?, null, ?, ?, 0)", [idEmpresa, infos.titulo, infos.valor, infos.data_vencimento, infos.tipo_pagamento, infos.id_categoria])
}

async function updatePayments(params, tipo, id) {
    let sql = [];
    for (const field of params) {
        sql.push(field.field + " = " + field.value);
    }
    let tabela = "";
    if (tipo == '1') { tabela = "financas_contas_receber"; }
    if (tipo == '2') { tabela = "financas_contas_pagar"; }
    let updSQL = "UPDATE " + tabela +" SET " + sql.join(",") + " WHERE id = ?";
    const data = await db.run(updSQL, [id]);
    return data;
}

module.exports = {
    importofx,
    relatorioOFX,
    getContasPagar,
    getContasReceber,
    getCashFlow,
    getFormaspagamento,
    getCategoriasFinancas,
    getCategoriasReportCards,
    getDashboardAcounts,
    getDashboardAcountsIncome,
    savePayments,
    saveReceipts,
    updatePayments
}