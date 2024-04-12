const database = require("../infra/postgres");

async function getProximosEventos() {
    try {
        let SQL = `SELECT * FROM dtibet.jogos WHERE encerrado = 0 ORDER BY data_jogo ASC`;
        let listaJogos = await database.any(SQL);
        for (const jogo of listaJogos) {
        //listaJogos.forEach(jogo => {
            jogo.apostas = await database.any("SELECT * FROM dtibet.apostas WHERE id_jogo = $1 ORDER BY nome ASC", [jogo.id]);
        };
        return listaJogos;
    } catch (err) {
        console.log(err);
    }
}

async function listarJogos() {
    try {
        let SQL = `SELECT * FROM dtibet.jogos ORDER BY data_jogo DESC`;
        return await database.any(SQL);
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function getApostasByIdJogo(id) {
    try {
        let SQL = `SELECT * FROM dtibet.apostas WHERE id_jogo = $1 ORDER BY nome ASC`;
        return await database.any(SQL,[id]);
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function salvarAposta(fields) {
    try {
        let SQL = `INSERT INTO dtibet.apostas VALUES (DEFAULT, $1, $2, $3, $4, now())`;
        await database.any(SQL,[fields.jogo.id, fields.nome, fields.gols_time_a, fields.gols_time_b]);
        return { success: true };
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function salvarJogo(fields) {
    try {
        let SQL = `INSERT INTO dtibet.jogos VALUES (DEFAULT, $1, $2, $3, 0, 0, $4, $5, 0)`;
        await database.any(SQL,[fields.id_campeonato, fields.time_a, fields.time_b, fields.data_jogo, fields.horario]);
        return { success: true };
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function atualizarJogo(fields) {
    try {
        let SQL = `UPDATE dtibet.jogos SET 
            gols_a = $2,
            gols_b = $3
        WHERE id = $1`;
        return await database.any(SQL,[fields.id, fields.gols_time_a, fields.gols_time_b]);
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    getProximosEventos,
    getApostasByIdJogo,
    listarJogos,
    salvarAposta,
    salvarJogo,
    atualizarJogo,
}