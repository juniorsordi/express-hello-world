const db = require("../mariadb");
var crypto = require('crypto');
var moment = require("moment");

async function getContasPagar(idEmpresa) {
    const data = await db.query("SELECT * FROM financas_contas_pagar WHERE id_customer = ? ORDER BY data_vencto ASC", [idEmpresa]);
    return data;
}

async function getContasReceber(idEmpresa) {
    const data = await db.query("SELECT * FROM financas_contas_receber WHERE id_customer = ? ORDER BY data_vencto ASC", [idEmpresa]);
    return data;
}

async function getCashFlow(idEmpresa) {
    const data = await db.query(`
        SELECT a.*, '1' as type FROM financas_contas_receber a WHERE id_customer = ? 
        UNION 
        SELECT b.*, '2' as type FROM financas_contas_pagar b WHERE id_customer = ?
        ORDER BY data_vencto ASC
        
    `, [idEmpresa, idEmpresa]);
    return data;
}

async function savePayments(infos, idEmpresa) {
    //let data_vencto = infos.data_vencimento;
    return await db.query("INSERT INTO financas_contas_pagar VALUES (null, ?, ?, ?, 1, 0, ?)", [infos.titulo, infos.valor, infos.data_vencimento, idEmpresa])
}

async function saveReceipts(infos, idEmpresa) {
    //let data_vencto = infos.data_vencimento;
    return await db.query("INSERT INTO financas_contas_receber VALUES (null, ?, ?, ?, 1, 0, ?)", [infos.titulo, infos.valor, infos.data_vencimento, idEmpresa])
}

module.exports = {
    getContasPagar,
    getContasReceber,
    getCashFlow,
    savePayments,
    saveReceipts
}