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

async function getAgendamentoPrestadores() {
    try {
        let SQL = `SELECT * FROM agendamento_prestador ORDER BY titulo ASC`
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAgendamentoAreas,
    getAgendamentoPrestadores,
}