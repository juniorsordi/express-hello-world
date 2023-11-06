var crypto = require('crypto');
const jwt = require("jsonwebtoken");
var fs = require("fs");
const moment = require("moment");
const database = require("../infra/database");

async function listarControleMudancas() {
    try {
        let SQL = `SELECT * FROM controle_mudancas`;
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
    }
}

async function salvarControleMudanca(fields) {
    try {
        //return fields;
        let SQL = `INSERT INTO controle_mudancas VALUES (null, ?,?,?,?,?,?,?,null,?,?,?,1,DateTime('now', 'localtime'),?)`;
        return await database.any(SQL, [fields.num_os,fields.sistema,fields.solicitante,fields.unidade,fields.analista,fields.tipo,
            fields.descricao,fields.tecnologia,fields.profissional_alocado,fields.tempo_gasto,fields.tempo_gasto_medida]);
    } catch (err) {
        console.log(err);
    }
}

async function pegarControleMudancas(id) {
    try {
        let SQL = `SELECT * FROM controle_mudancas WHERE id = ?`;
        let info = await database.any(SQL,[id]);

        let detalhamentos = await database.any("SELECT * FROM controle_mudancas_detalhamento WHERE id_controle_mudancas = ?", [id]);
        info[0].detalhamentos = detalhamentos;

        return info;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    listarControleMudancas,
    pegarControleMudancas,
    salvarControleMudanca,
}