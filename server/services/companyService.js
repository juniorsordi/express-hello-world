var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const database = require("../infra/postgres");

async function getCompanyClients(idEmpresa) {
    try {
        let SQL = `SELECT * FROM empresa_cliente WHERE id_empresa = $1`
        return await database.query(SQL, [idEmpresa]);
    } catch (err) {
        console.log(err);
    }
}

async function saveCompanyClient(fields, idEmpresa) {
    try {
        let SQL = `INSERT INTO empresa_cliente (nome, logo, ativo, id_empresa) VALUES ($1, $2, true, $3)`;
        return await database.query(SQL, [fields.nome_cliente, fields.logo, idEmpresa]);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCompanyClients,
    saveCompanyClient,
    //getProject,
    //updateProject,
    //addTaskProject,
}