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
        if(fields.descricao == null) { fields.descricao = ""; }
        
        let SQL = `INSERT INTO controle_mudancas VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, null, $8, $9, $10, 1, NOW(), $11)`;
        return await database.any(SQL, [fields.num_os,fields.sistema,fields.solicitante,fields.unidade,fields.analista,fields.tipo,
            fields.descricao,fields.tecnologia,fields.profissional_alocado,fields.tempo_gasto,fields.tempo_gasto_medida]);
    } catch (err) {
        console.log(err);
    }
}

async function pegarControleMudancas(id) {
    try {
        let SQL = `SELECT * FROM controle_mudancas WHERE id = $1`;
        let info = await database.any(SQL,[id]);

        let detalhamentos = await database.any("SELECT * FROM controle_mudancas_detalhamento WHERE id_controle_mudancas = $1", [id]);
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