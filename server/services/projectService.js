var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const database = require("../infra/postgres");
var moment = require("moment");

async function listProjects(idEmpresa) {
    try {
        let SQL = `SELECT * FROM projeto WHERE id_empresa = $1 ORDER BY nome ASC`;
       return await database.query(SQL,[idEmpresa]);
    } catch (err) {
        console.log(err);
    }
}

async function saveProject(data, user) {
    let user_id = user.id;
    let idEmpresa = user.id_empresa;
    let start_date = moment(data.inicio_estimado, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let end_date = moment(data.termino_estimado, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let daysDiff = moment(data.termino_estimado, 'DD/MM/YYYY').diff(moment(data.inicio_estimado, 'DD/MM/YYYY'), 'days');
    let monthDiff = daysDiff / 30;
    let internetFee = (134.90 / 30) * monthDiff;
    let foodFee = (22 * 25) * monthDiff;
    let estimated_expenses = (data.esforco_estimado * 0.5) + internetFee + foodFee;
    //console.log([daysDiff, monthDiff, internetFee,foodFee]);
    let SQL = `INSERT INTO projeto 
    VALUES 
        (DEFAULT, $1, $2, $3, $4, $5, 0, 0, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *`;
        /*
    console.log([data.nome, 
        data.descricao, 
        start_date,
        end_date,
        data.esforco_estimado,
        data.id_categoria,
        data.id_cliente,
        data.id_status,
        data.prioridade,
        data.valor_hora,
        data.budget,  
        estimated_expenses, 
        idEmpresa]);
    return data;
    //*/
    const info = await database.one(SQL, [data.nome,
        data.descricao,
        start_date,
        end_date,
        data.esforco_estimado,
        user_id,
        data.id_categoria,
        data.id_cliente,
        data.id_status,
        data.prioridade,
        data.valor_hora,
        data.budget,
        estimated_expenses,
        idEmpresa]);
    return info;
}

async function getProject(id) {
    const data = await database.query(`SELECT
                a.*,
                a.inicio_estimado as inicio_estimado2,
                a.termino_estimado as termino_estimado2,
                b.nome as tipo_projeto,
                valor_hora,
                ( 0 ) as percentual_receita,
                ( 0 ) as percentual_custo,
                (SELECT nome FROM usuario WHERE id = a.id_responsavel) as nome_responsavel,
                (SELECT foto FROM usuario WHERE id = a.id_responsavel) as foto_responsavel,
                (SELECT nome FROM empresa_cliente WHERE id = a.id_cliente) as nome_cliente,
                (SELECT cor FROM projeto_situacao WHERE id = a.id_status) as cor_situacao,
                (SELECT sum(esforco) FROM projeto_atividade_apontamento where id_atividade IN (SELECT id from projeto_atividade WHERE id_projeto = a.id) and pago = false) as unpaidHours,
                (SELECT sum(esforco) FROM projeto_atividade_apontamento where id_atividade IN (SELECT id from projeto_atividade WHERE id_projeto = a.id) and pago = true) as paidHours,
                ((SELECT sum(esforco) FROM projeto_atividade_apontamento where id_atividade IN (SELECT id from projeto_atividade WHERE id_projeto = a.id) and pago = false) * a.valor_hora) as expected_payment,
                c.nome as nome_situacao
            FROM projeto a
            LEFT JOIN projeto_tipo b ON (b.id = a.id_categoria)
            LEFT JOIN projeto_situacao c ON (c.id = a.id_status)
            WHERE a.id = $1`, [id]);
    //var participants = await database.query(`SELECT nome, foto, email FROM projeto_atividade_participante a LEFT JOIN usuario b ON (b.id = a.id_usuario) WHERE id_projeto = $1`, [id]);
    var activities = await database.query(`SELECT * FROM projeto_atividade WHERE id_projeto = $1 ORDER BY id ASC, etapa ASC`, [id]);
    data[0]['atividades'] = activities;
    if (data[0]['expected_payment'] == null) { data[0]['expected_payment'] = 0; }
    var i = 0;
    for (const item of activities) {
        var idUser = item.id_responsavel;
        var temp1 = await database.query("SELECT nome, foto, email FROM usuario WHERE id = $1", [idUser]);
        activities[i]['responsavel'] = temp1[0];

        var persons = await database.query(`SELECT nome, foto, email FROM projeto_atividade_participante a
                LEFT JOIN usuario b ON (b.id = a.id_usuario)
                WHERE id_atividade = $1`, [item.id]);
        activities[i]['participantes'] = persons;
        i++;
    }
    //data[0]['participantes'] = participants;
    //const financies = getFinancesInfo(id, data[0].valor_hora);
    //data[0]['financies'] = financies;
    //let cashflow = await database.query("SELECT * FROM projeto_financeiro WHERE id_projeto = $1", [id]);
    //data[0]['cashflow'] = cashflow;
    var timeEntries = await database.query(`SELECT a.*, 
        (SELECT titulo FROM projeto_atividade WHERE id = a.id_atividade ) as atividade_titulo,
        (SELECT nome FROM usuario WHERE id = a.id_usuario ) as nome_responsavel,
        (SELECT foto FROM usuario WHERE id = a.id_usuario ) as foto_responsavel
        FROM projeto_atividade_apontamento a
        where id_atividade in (select id from projeto_atividade where id_projeto = ${id})`);
    data[0]['timeEntries'] = timeEntries;
    //*
    var comments = await database.query(`SELECT nome, foto, email, comentario, a.data_cadastro FROM projeto_comentario a
        LEFT JOIN usuario b ON (b.id = a.id_usuario)
        WHERE a.id_projeto = $1`, [id]);
    data[0]['comments'] = comments;
    //*/
    return data[0];
}

async function updateProject(id, params) {
    let sql = [];
    for (const field of params) {
        sql.push(field.field + " = " + field.value);
    }
    let updSQL = "UPDATE projeto SET " + sql.join(",") + " WHERE id = ?";
    const data = await database.query(updSQL, [id]);
    return data;
}

async function saveNewTask(data, project_id, user_id) {
    if (data.descricao == null) { data.descricao = ""; }
    let SQL = `INSERT INTO projeto_atividade VALUES 
        (DEFAULT, ${project_id}, '${data.titulo}', '${data.descricao}', ${data.etapa}, '${data.inicio_estimado}', '${data.termino_estimado}', 
        ${data.esforco_estimado}, 0, 0, 1, ${user_id}, NOW(), NOW()) returning *`;
    return await database.one(SQL);
}

async function saveTimeEntry(data) {
    if (data.observacao == null) { data.observacao = ""; }
    let SQL = "INSERT INTO projeto_atividade_apontamento VALUES (DEFAULT, $1, $2, $3, $4, $5, now(), now(), false) returning *";
    let result = await database.any(SQL, [data.id_atividade, 
        data.id_usuario, 
        data.horas, 
        data.observacao,
        data.data
    ]);
    let idProjeto = 0;
    if (result) {
        const atividade = await database.any("SELECT * FROM projeto_atividade WHERE id = $1", [data.id_atividade]);
        let EsforcoAtual = atividade[0]['esforco_real'] + data.horas;
        let Perc_Completo = (EsforcoAtual * 100) / atividade[0]['esforco_estimado'];
        ///
        idProjeto = atividade[0].id_projeto;
        let SQL2 = "UPDATE projeto_atividade SET esforco_real = $1,  percentual_completo = $2 WHERE id = $3";
        await database.any(SQL2, [EsforcoAtual, Perc_Completo, data.id_atividade]);

        updateProjectTimeEntries(data.id_atividade, idProjeto);
        return result;
    }
}

async function updateProjectTimeEntries(id_atividade, id_projeto) {
    const result = await database.one(`SELECT 
            avg(percentual_completo) as andamento_projeto, 
            sum(esforco_real) as esforco_real,
            sum(esforco_estimado) as esforco_estimado
        FROM projeto_atividade
        WHERE id_projeto = (SELECT id_projeto FROM projeto_atividade WHERE id = $1)`, [id_atividade]);
    if (result) {
        let EsforcoAtual = result.esforco_real;
        let esforco_estimado = result.esforco_estimado;
        let Percentual = (EsforcoAtual * 100) / esforco_estimado;//result[0].andamento_projeto;
        let IDProjeto = id_projeto;
        let SQL2 = `UPDATE projeto SET
                        esforco_real = $1,
                        esforco_estimado = $2,
                        percentual_completo = $3
                    WHERE id = $4`;
        await database.any(SQL2, [EsforcoAtual, esforco_estimado, Percentual, IDProjeto]);
    }
}

async function saveProjectComment(comment) {
    let SQL = "INSERT INTO projeto_comentario VALUES (DEFAULT, $1, $2, $3, now()) RETURNING *";
    return await database.one(SQL, [comment.project_id, comment.user_id, comment.description]);
}

module.exports = {
    listProjects,
    saveProject,
    getProject,
    updateProject,
    saveNewTask,
    saveTimeEntry,
    saveProjectComment,
    //addTaskProject,
}