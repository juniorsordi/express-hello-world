const moment = require("moment");
const database = require("../infra/database");
moment.locale('pt-br');

async function salvarBatidaPonto(fields) {
    let hoje = moment();
    let SQL = "INSERT INTO rh_batida_ponto VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) returning *";
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
    let SQL0 = `SELECT * FROM rh_batida_ponto
        WHERE id_usuario = $1
        ORDER BY dia DESC, mes DESC, ano DESC, hora DESC
        LIMIT 28`;
    let SQL = `SELECT dia, mes, ano 
        , (SELECT min(hora) from rh_batida_ponto where id_usuario = a.id_usuario and dia = a.dia and mes = a.mes and ano = a.ano) as entrada
        , (SELECT max(hora) from rh_batida_ponto where id_usuario = a.id_usuario and dia = a.dia and mes = a.mes and ano = a.ano) as saida
        , (age(max((ano || '-'||mes||'-'||dia||' '||hora)::timestamp), min((ano||'-'||mes||'-'||dia||' '||hora)::timestamp)) - interval '1 hour' )::time as dif
    FROM rh_batida_ponto a
    WHERE id_usuario = $1 
    GROUP BY dia, mes, ano, id_usuario
    ORDER BY dia DESC, mes DESC, ano DESC`
    const data = await database.any(SQL, [idUser]);
    return data;
}

async function calculoBancoHorasUsuario(idUser) {
    let mesAtual = moment().format("MM");
    let SQL1 = `SELECT distinct dia, mes, ano FROM rh_batida_ponto WHERE mes = $1 AND id_usuario = $2;`;
    const data = await database.any(SQL1, [mesAtual, idUser]);
    var i = 0;
    for (const element of data) {
        let SQL2 = `SELECT 
                        (age(max((ano || '-'||mes||'-'||dia||' '||hora)::timestamp), min((ano||'-'||mes||'-'||dia||' '||hora)::timestamp))  - interval '1 hour')::time as dif 
                FROM rh_batida_ponto a
                WHERE ano = $1 AND mes = $2 and dia = $3 and id_usuario = $4`
        let temp = await database.one(SQL2,[element.ano, element.mes, element.dia, idUser]);
        let temp2 = await database.one(`SELECT (AGE('2000-01-01 ${temp.dif}','2000-01-01 08:00:00')) as temp1`);
        element.saldo = temp2.temp1;
    }
    return data;
}

module.exports = {
    salvarBatidaPonto,
    listarUltimasBatidas,
    calculoBancoHorasUsuario,
}