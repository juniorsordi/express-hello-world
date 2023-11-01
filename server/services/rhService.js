var crypto = require('crypto');
const jwt = require("jsonwebtoken");
var fs = require("fs");
const moment = require("moment");
//const ofx = require('ofx-convertjs');

const database = require("../infra/database");
moment.locale('pt-br');

async function salvarBatidaPonto(fields) {
    let hoje = moment();
    let SQL = "INSERT INTO rh_batida_ponto VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) returning *";
    //*
    const info = await database.any(SQL, [
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
    let SQL = `SELECT * FROM rh_batida_ponto
        WHERE id_usuario = $1
        ORDER BY dia DESC, mes DESC, ano DESC, hora DESC
        LIMIT 28`;
    const data = await database.any(SQL, [idUser]);
    return data;
}



module.exports = {
    salvarBatidaPonto,
    listarUltimasBatidas
}