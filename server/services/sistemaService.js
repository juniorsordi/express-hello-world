var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const moment = require("moment");

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

async function listarMensagensUsuario(idUser) {
    let SQL = `SELECT * FROM sistema_mensagem a WHERE id_usuario_destino = $1 AND lido = 0`;
    const data = await database.any(SQL, [idUser]);
    return data;
}

async function inserirMensagemUsuario(fields) { }


module.exports = {
    listarNotificacoesNaoLidas,
    inserirNotificacao,
    listarMensagensUsuario,
    inserirMensagemUsuario,
    listarUsuarios,
}