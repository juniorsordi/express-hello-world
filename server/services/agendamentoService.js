var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const database = require("../infra/postgres");

async function getAgendamentoAreas() {
    try {
        let SQL = `SELECT * FROM agendamento_areas ORDER BY nome_area ASC`
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
    }
}

async function getAcademiasAtivas() {
    try {
        let SQL = `SELECT * FROM agendamento_academias ORDER BY nome ASC`;
        let lista = await database.any(SQL);
        return lista;
    } catch (err) {
        console.log(err);
    }
}

async function getAgendamentoPrestadores() {
    try {
        let SQL = `SELECT * FROM agendamento_prestador ORDER BY titulo ASC`
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
    }
}

async function getAgendamentoPrestadorByID(id) {
    try {
        let SQL = `SELECT * FROM agendamento_prestador WHERE id = $1`
        let prestador = await database.one(SQL, [id]);
        prestador.produtos = await database.any(`SELECT * FROM agendamento_prestador_produto WHERE id_prestador = $1 ORDER BY nome ASC`, [prestador.id]);
        return prestador;
    } catch (err) {
        console.log(err);
    }
}

async function getAgendaUsuario(id) {
    try {
        let SQL = `SELECT * FROM agendamento_prestador_compromisso WHERE data >= now() AND id_usuario_solicitante = 3 ORDER BY data DESC, horario DESC`;
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
    }
}

async function getAgendaUsuarioPassada(id) {
    try {
        let SQL = `SELECT * FROM agendamento_prestador_compromisso WHERE data < now() AND id_usuario_solicitante = 2 ORDER BY data DESC, horario DESC`;
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAgendamentoAreas,
    getAgendamentoPrestadores,
    getAgendamentoPrestadorByID,
    getAcademiasAtivas,
    getAgendaUsuario,
    getAgendaUsuarioPassada,
}