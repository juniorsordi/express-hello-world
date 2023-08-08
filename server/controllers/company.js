const db = require("../mariadb");
var crypto = require('crypto');
var moment = require("moment");

async function getCompanyUsers(idEmpresa) {
    //var year = moment().format('YYYY');
    const data = await db.query(`SELECT * FROM usuario WHERE id_empresa = ? ORDER BY nome ASC`, [idEmpresa]);
    return data;
}

module.exports = {
    getCompanyUsers
}