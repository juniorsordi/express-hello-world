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
    let SQL = `SELECT a.*
    , (SELECT json_build_object(
                'nome', nome,
                'foto', foto,
                'email', email
            ) FROM usuario WHERE id = a.id_usuario_origem
        ) as origem
    FROM sistema_mensagem a 
    WHERE id_usuario_destino = $1 AND lido = 0`;
    const data = await database.any(SQL, [idUser]);
    return data;
}

async function inserirMensagemUsuario(fields) { }

async function dashboardSistema(idEmpresa, idUser) {
    var currentYear = moment().format('YYYY');
    let SQL = `SELECT tipo, sum(valor) as soma from financas_movimentacao 
        where id_conta_bancaria in (select id from financas_conta_bancaria where id_tipo_conta = 1) 
        and status = 1 
        and data_baixa BETWEEN '${currentYear}-01-01' and '${currentYear}-12-31'
        group by tipo`;
    const data = await database.any(SQL);

    let results = {
        financas: data,
        projetos: []
    };
    return results;
}

module.exports = {
    listarNotificacoesNaoLidas,
    inserirNotificacao,
    listarMensagensUsuario,
    inserirMensagemUsuario,
    listarUsuarios,
    dashboardSistema,
}