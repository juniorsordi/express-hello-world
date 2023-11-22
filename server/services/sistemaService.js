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

async function gerarItemsMenuLateral(idUser) {
    let SQL = `SELECT * FROM sistema_menus a WHERE id_menu_pai is null AND ativo = true`;
    const data = await database.any(SQL);
    for(const menu of data) {
        const childrens = await database.any("SELECT * FROM sistema_menus a WHERE id_menu_pai = $1 AND ativo = true", [menu.id]);
        menu.childrens = childrens;
    }
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
    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var endData = moment().endOf('month').format('YYYY-MM-DD');
    let SQL = `SELECT tipo, sum(valor) as soma from financas_movimentacao 
        where id_conta_bancaria in (select id from financas_conta_bancaria where id_tipo_conta = 1) 
        and status = 1 
        and data_baixa BETWEEN '${startDate}' and '${endData}'
        group by tipo`;
    const data = await database.any(SQL);

    const projectData = await database.any(`SELECT b.nome as situacao, coalesce(count(p.id),0) as total FROM projeto p
        LEFT JOIN projeto_situacao b ON (b.id = p.id_status)
        WHERE p.id_status is not null AND p.id_empresa = $1
        group by b.nome`, [idEmpresa]);

    let results = {
        financas: data,
        projetos: projectData
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
    gerarItemsMenuLateral,
}