const db = require("../mariadb");
var crypto = require('crypto');
var moment = require("moment");

async function dashboardRanking(idEmpresa) {
    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var SQL = `SELECT  b.nome as usuario, 
                b.foto as imagem,
                sum(esforco) as total_horas
                from projeto_atividade_apontamento a
                join usuario b on (b.id = a.id_usuario and b.id_empresa = ?)
                where a.data_apontamento between ? and now()
                group by b.nome`;
    const data = await db.query(SQL, [idEmpresa, startDate]);
    return data;
}

async function dashboardProjects(idEmpresa) {
    const data = await db.query(`SELECT b.descricao as situacao, count(p.id) as total FROM projeto p
        LEFT JOIN projeto_situacao b ON (b.id = p.id_situacao)
        WHERE p.id_situacao is not null AND p.id_empresa = ?
        group by b.descricao`, [idEmpresa]);
    return data;
}

async function dashboardProjectsByYear(idEmpresa) {
    const data = await db.query(`SELECT year(termino_real) as ano, count(id) as total FROM projeto
            where  termino_real is not null and year(termino_real) > 2019 and id_situacao = 3 AND id_empresa = ?
            group by year(termino_real)
            order by 1`, [idEmpresa]);
    return data;
}

async function dashboardGraphByType(idEmpresa, year) {
    //var year = moment().format('YYYY');
    const data = await db.query(`SELECT (select descricao from projeto_tipo where id = c.id_tipo_projeto) as tipo_projeto, sum(esforco ) as total from projeto_atividade_apontamento a
            left join projeto_atividade b on (b.id = a.id_atividade)
            left join projeto c on (c.id = b.id_projeto)
            WHERE YEAR(a.data_apontamento) = ? AND c.id_empresa = ?
            group by c.id_tipo_projeto 
            order by 2 DESC`, [year, idEmpresa]);
    return data;
}

async function dashboardGraphByClient(idEmpresa, year) {
    //var year = moment().format('YYYY');
    const data = await db.query(`SELECT (select nome_cliente from empresa_cliente where id = c.id_cliente) as cliente, sum(esforco ) as total from projeto_atividade_apontamento a
            left join projeto_atividade b on (b.id = a.id_atividade)
            left join projeto c on (c.id = b.id_projeto)
            WHERE YEAR(a.data_apontamento) = ? and c.id_empresa = ?
            group by c.id_cliente 
            order by 2 DESC`, [year, idEmpresa]);
    return data;
}

async function dashboardProjectsFinished(idEmpresa) {
    const data = await db.query("SELECT '1' FROM dual");
    return data;
}

async function listProjects(idEmpresa) {
    const data = await db.query(`SELECT a.*,
        b.descricao as nome_situacao,
        b.cor as cor_situacao
    FROM projeto a
    LEFT JOIN projeto_situacao b ON (b.id = a.id_situacao)
        WHERE a.id_empresa = ? AND b.visivel = 1`, [idEmpresa]);
    var i = 0;
    for(const project of data) {
        const users = await db.query(`SELECT b.id, b.nome, b.email, b.foto from projeto a
        left join usuario b on (b.id = a.id_proprietario)
        where a.id = ?
        union
        select b.id, b.nome, b.email, b.foto from projeto_atividade_participante a
        left join usuario b on (b.id = a.id_usuario)
        where a.id_projeto = ?`, [project.id, project.id]);
        data[i]['participantes'] = users;
        i++;
    }
    return data;
}

async function listKanbanProjects(idEmpresa, idProjeto) {
    const data = await db.query(`SELECT * FROM projeto_atividade_situacao WHERE id_empresa = ? AND ativo = 1 ORDER BY ordem ASC`, [idEmpresa]);
    var i = 0;
    for (const situacao of data) {
        const atividades = await db.query(`SELECT a.*, b.nome as nome_usuario, b.foto FROM projeto_atividade a
        LEFT JOIN usuario b ON (b.id = a.id_responsavel)
        WHERE id_projeto = ? AND id_status_atividade = ?`, [idProjeto, situacao.id]);
        data[i]['cards'] = atividades;
        i++;
    }
    return data;
}

async function updateKanbanAtividade(idAtividade, idSituacao) {
    return await db.query(`UPDATE projeto_atividade SET id_status_atividade = ? WHERE id = ?`, [idSituacao, idAtividade]);
}

async function getCompanyProjectTypes(idEmpresa) {
    const data = await db.query("SELECT id, descricao as label FROM projeto_tipo WHERE id_customer = ? AND ativo = 1", [idEmpresa]);
    return data;
}

async function getCompanyClients(idEmpresa) {
    const data = await db.query("SELECT id, nome_cliente as label FROM empresa_cliente WHERE id_customer = ? AND ativo = 1", [idEmpresa]);
    return data;
}

async function getCompanyCategories(idEmpresa) {
    const data = await db.query("SELECT id, descricao as label FROM empresa_categoria WHERE id_empresa = ?", [idEmpresa]);
    return data;
}

async function getCompanyStatus(idEmpresa) {
    const data = await db.query("SELECT id, descricao as label, cor as color FROM projeto_situacao WHERE id_empresa = ?", [idEmpresa]);
    return data;
}

async function getProject(id) {
    const data = await db.query(`SELECT
                a.*,
                DATEDIFF(termino_estimado, now()) as dias_projeto,
                DATE_FORMAT(a.inicio_estimado,  '%d/%m/%Y') as inicio_estimado2,
                DATE_FORMAT(a.termino_estimado,  '%d/%m/%Y') as termino_estimado2,
                DATE_FORMAT(a.inicio_real,  '%d/%m/%Y') as inicio_real2,
                DATE_FORMAT(a.termino_real,  '%d/%m/%Y') as termino_real2,
                DATE_FORMAT(a.inicio_estimado, '%Y-%m-%d') as inicio_estimado3,
                DATEDIFF(termino_estimado, now()) as dias_projeto,
                b.descricao as tipo_projeto,
                valor_hora,
                (SELECT sum(valor) FROM projeto_financeiro WHERE id_projeto = a.id AND tipo = 1) as total_recebido,
                ( (a.receita_real * 100) / a.receita_estimada) as percentual_receita,
                ( (a.custo_real * 100) / a.custo_estimado) as percentual_custo,
                (SELECT nome FROM usuario WHERE id = a.id_proprietario) as nome_responsavel,
                (SELECT foto FROM usuario WHERE id = a.id_proprietario) as foto_responsavel,
                (SELECT nome FROM empresa_prioridade WHERE id = a.id_prioridade) as prioridade,
                (SELECT nome_cliente FROM empresa_cliente WHERE id = a.id_cliente) as nome_cliente,
                (SELECT descricao FROM projeto_situacao WHERE id = a.id_situacao) as nome_situacao,
                (SELECT cor FROM projeto_situacao WHERE id = a.id_situacao) as cor_situacao,
                (SELECT sum(esforco) FROM projeto_atividade_apontamento where id_atividade IN (SELECT id from projeto_atividade WHERE id_projeto = a.id) and pago = 0) as unpaidHours,
                (SELECT sum(esforco) FROM projeto_atividade_apontamento where id_atividade IN (SELECT id from projeto_atividade WHERE id_projeto = a.id) and pago = 1) as paidHours,
                ((SELECT sum(esforco) FROM projeto_atividade_apontamento where id_atividade IN (SELECT id from projeto_atividade WHERE id_projeto = a.id) and pago = 0) * a.valor_hora) as expected_payment,
                c.descricao as nome_situacao
            FROM projeto a
            LEFT JOIN projeto_tipo b ON (b.id = a.id_tipo_projeto)
            LEFT JOIN projeto_situacao c ON (c.id = a.id_situacao)
            WHERE a.id = ?`,[id]);
    var participants = await db.query(`SELECT nome, foto, email FROM projeto_atividade_participante a LEFT JOIN usuario b ON (b.id = a.id_usuario) WHERE id_projeto = ?`,[id]);
    var activities = await db.query(`SELECT * FROM projeto_atividade WHERE id_projeto = ?`,[id]);
    data[0]['atividades'] = activities;
    var i = 0;
    for (const item of activities) {
        var idUser = item.id_responsavel;
        var temp1 = await db.query("SELECT nome, foto, email FROM usuario WHERE id = ?", [idUser]);
        activities[i]['responsavel'] = temp1[0];

        var persons = await db.query(`SELECT nome, foto, email FROM projeto_atividade_participante a
                LEFT JOIN usuario b ON (b.id = a.id_usuario)
                WHERE id_atividade = ?`,[item.id]);
        activities[i]['participantes'] = persons;
        i++;
    }
    data[0]['participantes'] = participants;
    const financies = getFinancesInfo(id, data[0].valor_hora);
    data[0]['financies'] = financies;
    let cashflow = await db.query("SELECT * FROM projeto_financeiro WHERE id_projeto = ?", [id]);
    data[0]['cashflow'] = cashflow;
    var timeEntries = await db.query(`SELECT a.*, 
        (SELECT titulo FROM projeto_atividade WHERE id = a.id_atividade ) as atividade_titulo,
        (SELECT nome FROM usuario WHERE id = a.id_usuario ) as nome_responsavel,
        (SELECT foto FROM usuario WHERE id = a.id_usuario ) as foto_responsavel
        FROM projeto_atividade_apontamento a
        where id_atividade in (select id from projeto_atividade where id_projeto = ${id})`);
    data[0]['timeEntries'] = timeEntries;
    var comments = await db.query(`SELECT nome, foto, email, comentario, a.data_cadastro FROM projeto_comentario a
        LEFT JOIN usuario b ON (b.id = a.id_usuario)
        WHERE a.id_projeto = ?`,[id]);
    data[0]['comments'] = comments;
    return data[0];
}

async function updateProject(id, params) {
    let sql = [];
    for(const field of params) {
        sql.push(field.field+" = "+field.value);
    }
    let updSQL = "UPDATE projeto SET "+sql.join(",")+" WHERE id = ?";
    const data = await db.query(updSQL, [id]);
    return data;
}

async function saveProjectComment(comment) {
    let SQL = "INSERT INTO projeto_comentario VALUES (null, ?, ?, ?, now())";
    return await db.query(SQL, [comment.project_id, comment.user_id, comment.description]);
}

async function saveProject(data, user) {
    let user_id = user.id;
    let idEmpresa = user.id_empresa;
    let start_date = moment(data.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let end_date = moment(data.due_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let internetFee = 120;
    let foodFee = (data.estimated_effort / 6) * 30;
    let estimated_expenses = (data.estimated_effort * 0.715322)+internetFee+foodFee;
    let SQL = `INSERT INTO projeto 
        (nome, descricao, id_situacao, id_tipo_projeto, id_cliente, id_prioridade, inicio_estimado, termino_estimado, esforco_estimado, receita_estimada, 
            criado_em, id_proprietario, valor_hora, id_empresa, custo_estimado)
    VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?, ?, ?, ?)`;
    console.log([data.name, data.description, data.status, data.id_category, data.id_client, data.priority, start_date, end_date, data.estimated_effort, data.budget, user_id, data.hour_value]);
    const info = await db.query(SQL, [data.name, data.description, data.status, data.id_category, data.id_client, data.priority, start_date, end_date, data.estimated_effort, data.budget, user_id, data.hour_value, idEmpresa, estimated_expenses]);
}

async function saveTimeEntry(data) {
    if (data.observacao == null) { data.observacao = ""; }
    let SQL = "INSERT INTO projeto_atividade_apontamento VALUES (null, ?, ?, ?, ?, now(), now(), ?, 0)";
    let result = await db.query(SQL, [data.id_atividade, data.id_usuario, data.horas, data.data, data.observacao]);
    if(result) {
        const atividade = await db.query("SELECT * FROM projeto_atividade WHERE id = ?", [data.id_atividade]);
        let EsforcoAtual = atividade[0]['esforco_atual'] + data.horas;
        let Perc_Completo = (EsforcoAtual * 100) / atividade[0]['esforco_estimado'];
        ///
        let SQL2 = "UPDATE projeto_atividade SET esforco_atual = ?,  esforco_completo_perc = ? WHERE id = ?";
        await db.query(SQL2, [EsforcoAtual, Perc_Completo, data.id_atividade]);
    }
    updateProjectTimeEntries(data.id_atividade);
}

async function updateProjectTimeEntries(id_atividade) {
    const result = await db.query(`SELECT 
            avg(esforco_completo_perc) as andamento_projeto, 
            sum(esforco_atual) as esforco_atual,
            id_projeto
        FROM projeto_atividade
        WHERE id_projeto = (SELECT id_projeto FROM projeto_atividade WHERE id = ?) `, [id_atividade]);
    if(result) {
        let EsforcoAtual = result[0].esforco_atual;
        let Percentual = result[0].andamento_projeto;
        let IDProjeto = result[0].id_projeto;
        let SQL2 = `UPDATE projeto SET
                        esforco_atual = ?,
                        percentual_completo = ?
                    WHERE id = ?`;
        await db.query(SQL2, [EsforcoAtual, Percentual, IDProjeto]);
    }
}

async function saveNewTask(data, project_id, user_id) {
    let SQL = `INSERT INTO projeto_atividade VALUES 
        (null, ${project_id}, '${data.title}', '${data.description}', ${data.group}, null, '${data.start_date}', '${data.due_date}', null, null, null, 0, ${data.estimated_effort}, 0, 0, null, ${user_id}, ${user_id}, null, now(), now(), null, null)`;
    return await db.query(SQL);
}

async function getFinancesInfo(id, valor_hora) {
    const nonPaidEntries = await db.query(`SELECT sum(esforco) as totalHoras
            , (sum(esforco) * ${valor_hora}) as totalDinheiro
        FROM projeto_atividade_apontamento 
        where id_atividade in (select id from projeto_atividade where id_projeto = ${id})
        and pago = 0`);
    const paidEntries = await db.query(`SELECT 
            sum(esforco) as totalHoras 
            , (sum(esforco) * ${valor_hora}) as totalDinheiro
        FROM projeto_atividade_apontamento 
        where id_atividade in (select id from projeto_atividade where id_projeto = ${id})
        and pago = 1`);
    console.log(nonPaidEntries[0]);
    return { 
        paid: paidEntries[0],
        unpaid: nonPaidEntries[0]
    };
}

async function getActivity(id) {
    const data = await db.query(`SELECT * FROM projeto_atividade WHERE id = ?`,[id]);
    var i = 0;//*
    for (const item of data) {
        var idUser = item.id_responsavel;
        var temp1 = await db.query("SELECT nome, foto, email FROM usuario WHERE id = ?", [idUser]);
        data[i]['responsavel'] = temp1[0];

        var persons = await db.query(`SELECT nome, foto, email FROM projeto_atividade_participante a
                LEFT JOIN usuario b ON (b.id = a.id_usuario)
                WHERE id_atividade = ?`, [item.id]);
        data[i]['participantes'] = persons;
        i++;
    }//*/
    return data[0];
}

async function getCompanyActivityStatus(id) {
    const data = await db.query(`SELECT * FROM projeto_atividade_situacao WHERE id_empresa = ?`, [id]);
    return data;
}

module.exports = {
    dashboardRanking,
    dashboardProjects,
    dashboardProjectsByYear,
    dashboardGraphByType,
    dashboardGraphByClient,
    dashboardProjectsFinished,
    listProjects,
    listKanbanProjects,
    updateKanbanAtividade,
    getProject,
    updateProject,
    saveProjectComment,
    getCompanyProjectTypes,
    getCompanyClients,
    getCompanyCategories,
    getCompanyStatus,
    saveProject,
    saveTimeEntry,
    updateProjectTimeEntries,
    saveNewTask,
    getFinancesInfo,
    getActivity,
    getCompanyActivityStatus
}