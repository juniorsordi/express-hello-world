const database = require("../infra/postgres");
const fetch = require('node-fetch');
const request = require('request');

async function getProximosEventos() {
    try {
        let SQL = `SELECT * FROM dtibet.jogos 
        WHERE encerrado = 0 and data_jogo BETWEEN now() AND now() + interval '3' day
        ORDER BY data_jogo ASC`;
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

async function listarJogosDoDia() {
    try {
        let SQL = `SELECT * FROM dtibet.jogos 
        WHERE encerrado <> 1 and data_jogo <= now() + interval '1'
        ORDER BY data_jogo ASC`;
        let listaJogos = await database.any(SQL);
        for (const jogo of listaJogos) {
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

async function pesquisarJogoByID(id) {
    try {
        let SQL = `SELECT * FROM dtibet.jogos WHERE id = $1 ORDER BY data_jogo DESC`;
        let jogo = await database.any(SQL,[id]);
        jogo.apostas = await database.any("SELECT * FROM dtibet.apostas WHERE id_jogo = $1 ORDER BY nome ASC", [id]);
        return jogo;
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

async function atualizarInfoJogoAPI(id, callback) {
    //5185ef7e31a44439915632d4a8dfb08a
    let url = "https://api.football-data.org/v4/matches/"+id;
    let headers = {
        'X-Auth-Token': '5185ef7e31a44439915632d4a8dfb08a',
        'Access-Control-Allow-Methods': "GET",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "x-auth-token, x-response-control",
        'Content-Length': 0
    };
    //fetch(url, { method: 'GET', headers: headers }).then(callback);
    return request({
        url: url,
        headers: headers,
        json: true
    }, function(err, response, body) {
        let result = body;
        let encerradoSQL = "encerrado = 1, ";
        let SQL = `UPDATE dtibet.jogos SET 
            ${(result.status == "FINISHED" ? encerradoSQL : "")}
            gols_a = ${result.score.fullTime.home},
            gols_b = ${result.score.fullTime.away}
        WHERE id = ${id}`;
        //console.log(SQL);
        database.any(SQL);
        result.SQL = SQL;
        return callback(result);
    });
}

async function pegarListaJogosAPI(callback) {
    let url = "https://api.football-data.org/v4/competitions/2013/matches";
    let headers = {
        'X-Auth-Token': '5185ef7e31a44439915632d4a8dfb08a',
        'Access-Control-Allow-Methods': "GET",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "x-auth-token, x-response-control",
        'Content-Length': 0
    };
    //let lista = fetch(url, { method: 'GET', headers: headers });
    //return lista;
    return request({
        url: url,
        headers: headers,
        json: true
    }, function(err, response, body) {
        let result = body;
        for(const jogo of body.matches) {
            if(jogo.homeTeam == null) { continue; }
            let fields = {
                id_campeonato: 1,
                time_a: jogo.homeTeam.shortName,
                time_b: jogo.awayTeam.shortName,
                data_jogo: jogo.utcDate,
                horario: jogo.utcDate.substring(11,16),
                encerrado: 0
            };
            if(jogo.status == 'FINISHED') {
                fields.gols_a = jogo.score.fullTime.home;
                fields.gols_b = jogo.score.fullTime.away;
                fields.encerrado = 1;
            }

            let SQL = `INSERT INTO dtibet.jogos VALUES (${jogo.id}, $1, $2, $3, $4, $5, $6, $7, $8)`;
            database.any(SQL,[fields.id_campeonato, fields.time_a, fields.time_b, fields.gols_a, fields.gols_b, fields.data_jogo, fields.horario, fields.encerrado]);
        }
        return callback(result);
    });
}

module.exports = {
    listarJogosDoDia,
    getProximosEventos,
    getApostasByIdJogo,
    pesquisarJogoByID,
    listarJogos,
    salvarAposta,
    salvarJogo,
    atualizarJogo,
    pegarListaJogosAPI,
    atualizarInfoJogoAPI,
}