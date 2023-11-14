var crypto = require('crypto');
const jwt = require("jsonwebtoken");
var fs = require("fs");
const moment = require("moment");
//const ofx = require('ofx-convertjs');

const database = require("../infra/database");
moment.locale('pt-br');

async function listarNotificacoesNaoLidas(idUser) {
    let SQL = `SELECT * FROM sistema_notificacao a WHERE id_usuario = $1 AND lido = 0`;
    const data = await database.any(SQL, [idUser]);
    return data;
}

async function listarUsuarios(fields) {
    return fields;
    let SQL = `SELECT * FROM sistema_notificacao a WHERE id_usuario = $1 AND lido = 0`;
    const data = await database.any(SQL, [idUser]);
    return data;
}

async function inserirNotificacao(fields) { }

async function listarMensagensUsuario(idUser) { }

async function inserirMensagemUsuario(fields) { }


module.exports = {
    listarNotificacoesNaoLidas,
    inserirNotificacao,
    listarMensagensUsuario,
    inserirMensagemUsuario,
    listarUsuarios,
}