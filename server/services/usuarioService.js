const database = require("../infra/database");
const moment = require("moment");
moment.locale('pt-br');

async function listarUsuarios(fields) {
    //return fields;
    let SQL = `SELECT * FROM usuario`;
    const data = await database.any(SQL);
    return data;
}

module.exports = {
    listarUsuarios,
}