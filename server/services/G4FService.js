const database = require("../infra/database");
var moment = require("moment");
moment.locale('pt-br');

async function listProjects(idEmpresa) {
    try {
        let SQL = `SELECT * FROM projeto WHERE id_empresa = $1 ORDER BY nome ASC`;
        return await database.any(SQL,[idEmpresa]);
    } catch (err) {
        console.log(err);
    }
}

async function listarControleMudancas() {
    try {
        let SQL = `SELECT * FROM g4f.controle_mudancas`;
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
    }
}

async function salvarControleMudanca(fields) {
    try {
        if(fields.descricao == null) { fields.descricao = ""; }
        
        let SQL = `INSERT INTO g4f.controle_mudancas VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, null, $8, $9, $10, 1, NOW(), $11)`;
        return await database.any(SQL, [fields.num_os,fields.sistema,fields.solicitante,fields.unidade,fields.analista,fields.tipo,
            fields.descricao,fields.tecnologia,fields.profissional_alocado,fields.tempo_gasto,fields.tempo_gasto_medida]);
    } catch (err) {
        console.log(err);
    }
}

async function pegarControleMudancas(id) {
    try {
        let SQL = `SELECT a.* 
            , (SELECT nome FROM g4f.usuario WHERE id = a.analista_responsavel) as nome_analista
            , (SELECT nome FROM g4f.lista_tecnologias WHERE id = a.tecnologia) as nome_tecnologia
            , (TO_CHAR(now(),'dd/mm/yyyy')) as data_atual
        FROM g4f.controle_mudancas a
        WHERE a.id = $1`;
        let info = await database.any(SQL,[id]);

        let detalhamentos = await database.any("SELECT * FROM g4f.controle_mudancas_detalhamento WHERE id_controle_mudancas = $1", [id]);
        info[0].detalhamentos = detalhamentos;

        return info;
    } catch (err) {
        console.log(err);
    }
}

async function salvarBatidaPonto(fields) {
    let hoje = moment().utcOffset('-0300');
    let SQL = "INSERT INTO g4f.rh_batida_ponto VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) returning *";
    //*
    const info = await database.one(SQL, [
        fields.id_usuario,
        hoje.format('DD'),
        hoje.format('MM'),
        hoje.format('yyyy'),
        hoje.format('LTS'),
        hoje.format()
    ]);
    /*/
    let info = [
        fields.id_usuario,
        hoje.format('DD'),
        hoje.format('MM'),
        hoje.format('yyyy'),
        hoje.format('LTS'),
        hoje.format()
    ];//*/
    return info;
}

async function listarUltimasBatidas(idUser) {
    let SQL0 = `SELECT * FROM g4f.rh_batida_ponto
        WHERE id_usuario = $1
        ORDER BY dia DESC, mes DESC, ano DESC, hora DESC
        LIMIT 28`;
    let SQL = `SELECT dia, mes, ano 
        , (SELECT min(hora) from g4f.rh_batida_ponto where id_usuario = a.id_usuario and dia = a.dia and mes = a.mes and ano = a.ano) as entrada
        , (SELECT max(hora) from g4f.rh_batida_ponto where id_usuario = a.id_usuario and dia = a.dia and mes = a.mes and ano = a.ano) as saida
        , (age(max((ano || '-'||mes||'-'||dia||' '||hora)::timestamp), min((ano||'-'||mes||'-'||dia||' '||hora)::timestamp)) - interval '1 hour' )::time as dif
    FROM g4f.rh_batida_ponto a
    WHERE id_usuario = $1 
    GROUP BY dia, mes, ano, id_usuario
    ORDER BY dia DESC, mes DESC, ano DESC`
    const data = await database.any(SQL, [idUser]);
    return data;
}

async function calculoBancoHorasUsuario(idUser) {
    let mesAtual = moment().format("MM");
    let SQL1 = `SELECT distinct dia, mes, ano FROM g4f.rh_batida_ponto WHERE mes = $1 AND id_usuario = $2;`;
    const data = await database.any(SQL1, [mesAtual, idUser]);
    var i = 0;
    for (const element of data) {
        let SQL2 = `SELECT 
                        (age(max((ano || '-'||mes||'-'||dia||' '||hora)::timestamp), min((ano||'-'||mes||'-'||dia||' '||hora)::timestamp))  - interval '1 hour')::time as dif 
                FROM g4f.rh_batida_ponto a
                WHERE ano = $1 AND mes = $2 and dia = $3 and id_usuario = $4`
        let temp = await database.one(SQL2,[element.ano, element.mes, element.dia, idUser]);
        let temp2 = await database.one(`SELECT (AGE('2000-01-01 ${temp.dif}','2000-01-01 08:00:00')) as temp1`);
        element.saldo = temp2.temp1;
    }
    return data;
}

module.exports = {
    listProjects,
    listarControleMudancas,
    pegarControleMudancas,
    salvarControleMudanca,
    salvarBatidaPonto,
    listarUltimasBatidas,
    calculoBancoHorasUsuario,
}