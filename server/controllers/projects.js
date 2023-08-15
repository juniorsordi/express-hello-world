const db = require("../infra/database");
var moment = require("moment");

async function dashboardRanking(idEmpresa) {
    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var SQL = `SELECT  b.nome as usuario, 
                b.foto as imagem,
                ifnull(sum(esforco),0) as total_horas
                from projeto_atividade_apontamento a
                join usuario b on (b.id = a.id_usuario and b.id_empresa = ?)
                where a.data_apontamento between ? and DATETIME('now')
                group by b.nome`;
    const data = await db.all(SQL, [idEmpresa, startDate]);
    return data;
}

async function dashboardProjects(idEmpresa) {
    const data = await db.all(`SELECT b.descricao as situacao, ifnull(count(p.id),0) as total FROM projeto p
        LEFT JOIN projeto_situacao b ON (b.id = p.id_situacao)
        WHERE p.id_situacao is not null AND p.id_empresa = ?
        group by b.descricao`, [idEmpresa]);
    return data;
}

async function dashboardProjectsByYear(idEmpresa) {
    const data = await db.all(`SELECT DATE('%Y',termino_real) as ano, ifnull(count(id),0) as total FROM projeto
            where  termino_real is not null and DATE('%Y',termino_real) > 2019 and id_situacao = 3 AND id_empresa = ?
            group by DATE('%Y',termino_real)
            order by 1`, [idEmpresa]);
    return data;
}

async function dashboardGraphByType(idEmpresa, year) {
    //var year = moment().format('YYYY');
    const data = await db.all(`SELECT (select descricao from projeto_tipo where id = c.id_tipo_projeto) as tipo_projeto, ifnull(sum(esforco),0) as total from projeto_atividade_apontamento a
            left join projeto_atividade b on (b.id = a.id_atividade)
            left join projeto c on (c.id = b.id_projeto)
            WHERE strftime('%Y',a.data_apontamento) = ? AND c.id_empresa = ?
            group by c.id_tipo_projeto 
            order by 2 DESC`, [year, idEmpresa]);
    return data;
}

async function dashboardGraphByClient(idEmpresa, year) {
    //var year = moment().format('YYYY');
    const data = await db.all(`SELECT (select nome_cliente from empresa_cliente where id = c.id_cliente) as cliente, ifnull(sum(esforco ),0) as total from projeto_atividade_apontamento a
            left join projeto_atividade b on (b.id = a.id_atividade)
            left join projeto c on (c.id = b.id_projeto)
            WHERE strftime('%Y',a.data_apontamento) = ? and c.id_empresa = ?
            group by c.id_cliente 
            order by 2 DESC`, [year, idEmpresa]);
    return data;
}

async function dashboardProjectsFinished(idEmpresa) {
    const data = await db.all("SELECT '1' FROM dual");
    return data;
}

async function listProjects(idEmpresa) {
    const data = await db.all(`SELECT a.*,
        b.descricao as nome_situacao,
        b.cor as cor_situacao
    FROM projeto a
    LEFT JOIN projeto_situacao b ON (b.id = a.id_situacao)
        WHERE a.id_empresa = ? AND b.visivel = 1`, [idEmpresa]);
    var i = 0;
    for(const project of data) {
        const users = await db.all(`SELECT b.id, b.nome, b.email, b.foto from projeto a
        left join usuario b on (b.id = a.id_responsavel)
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
    const data = await db.all(`SELECT * FROM projeto_atividade_situacao WHERE id_empresa = ? AND ativo = 1 ORDER BY ordem ASC`, [idEmpresa]);
    var i = 0;
    for (const situacao of data) {
        const atividades = await db.all(`SELECT a.*, b.nome as nome_usuario, b.foto FROM projeto_atividade a
        LEFT JOIN usuario b ON (b.id = a.id_responsavel)
        WHERE id_projeto = ? AND id_status_atividade = ?`, [idProjeto, situacao.id]);
        data[i]['cards'] = atividades;
        i++;
    }
    return data;
}

async function updateKanbanAtividade(idAtividade, idSituacao) {
    return await db.run(`UPDATE projeto_atividade SET id_status_atividade = ? WHERE id = ?`, [idSituacao, idAtividade]);
}

async function getProject(id) {
    const data = await db.all(`SELECT
                a.*,
                DATE(a.inicio_estimado,  '%d/%m/%Y') as inicio_estimado2,
                DATE(a.termino_estimado,  '%d/%m/%Y') as termino_estimado2,
                DATE(a.inicio_real,  '%d/%m/%Y') as inicio_real2,
                DATE(a.termino_real,  '%d/%m/%Y') as termino_real2,
                DATE(a.inicio_estimado, '%Y-%m-%d') as inicio_estimado3,
                (DATETIME('now') - termino_estimado) as dias_projeto,
                b.descricao as tipo_projeto,
                valor_hora,
                (SELECT sum(valor) FROM projeto_financeiro WHERE id_projeto = a.id AND tipo_operacao = 1) as total_recebido,
                ( 0 ) as percentual_receita,
                ( 0 ) as percentual_custo,
                (SELECT nome FROM usuario WHERE id = a.id_responsavel) as nome_responsavel,
                (SELECT foto FROM usuario WHERE id = a.id_responsavel) as foto_responsavel,
                (SELECT nome FROM empresa_prioridade WHERE id = a.prioridade) as prioridade,
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
    var participants = await db.all(`SELECT nome, foto, email FROM projeto_atividade_participante a LEFT JOIN usuario b ON (b.id = a.id_usuario) WHERE id_projeto = ?`,[id]);
    var activities = await db.all(`SELECT * FROM projeto_atividade WHERE id_projeto = ?`,[id]);
    data[0]['atividades'] = activities;
    var i = 0;
    for (const item of activities) {
        var idUser = item.id_responsavel;
        var temp1 = await db.all("SELECT nome, foto, email FROM usuario WHERE id = ?", [idUser]);
        activities[i]['responsavel'] = temp1[0];

        var persons = await db.all(`SELECT nome, foto, email FROM projeto_atividade_participante a
                LEFT JOIN usuario b ON (b.id = a.id_usuario)
                WHERE id_atividade = ?`,[item.id]);
        activities[i]['participantes'] = persons;
        i++;
    }
    data[0]['participantes'] = participants;
    const financies = getFinancesInfo(id, data[0].valor_hora);
    data[0]['financies'] = financies;
    let cashflow = await db.all("SELECT * FROM projeto_financeiro WHERE id_projeto = ?", [id]);
    data[0]['cashflow'] = cashflow;
    var timeEntries = await db.all(`SELECT a.*, 
        (SELECT titulo FROM projeto_atividade WHERE id = a.id_atividade ) as atividade_titulo,
        (SELECT nome FROM usuario WHERE id = a.id_usuario ) as nome_responsavel,
        (SELECT foto FROM usuario WHERE id = a.id_usuario ) as foto_responsavel
        FROM projeto_atividade_apontamento a
        where id_atividade in (select id from projeto_atividade where id_projeto = ${id})`);
    data[0]['timeEntries'] = timeEntries;
    var comments = await db.all(`SELECT nome, foto, email, comentario, a.data_cadastro FROM projeto_comentario a
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
    const data = await db.run(updSQL, [id]);
    return data;
}

async function saveProjectComment(comment) {
    let SQL = "INSERT INTO projeto_comentario VALUES (null, ?, ?, ?, DATETIME('now'))";
    return await db.run(SQL, [comment.project_id, comment.user_id, comment.description]);
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
    VALUES 
        (null, ?, ?, ?, ?, null, ?, ?, null, null, ?, 0, 0, ?, ?, ?, ?, ?, ?, null, ?, DATETIME('now'), DATETIME('now'))`;
    //console.log([idEmpresa, data.name, data.description, data.status, data.id_category, data.id_client, data.priority, start_date, end_date, data.estimated_effort, data.budget, data.hour_value]);
    const info = await db.run(SQL, [idEmpresa, data.id_client, data.name, data.description, start_date, end_date, data.estimated_effort, data.status, data.id_category, data.priority, estimated_expenses, data.budget, data.hour_value, user_id]);
    return info;
}

async function saveTimeEntry(data) {
    if (data.observacao == null) { data.observacao = ""; }
    let SQL = "INSERT INTO projeto_atividade_apontamento VALUES (null, ?, ?, ?, ?, ?, DATETIME('now'), DATETIME('now'), 0)";
    let result = await db.all(SQL, [data.id_atividade, data.id_usuario, data.data, data.horas, data.observacao]);
    console.log(result);
    if(result) {
        const atividade = await db.all("SELECT * FROM projeto_atividade WHERE id = ?", [data.id_atividade]);
        let EsforcoAtual = atividade[0]['esforco_atual'] + data.horas;
        let Perc_Completo = (EsforcoAtual * 100) / atividade[0]['esforco_estimado'];
        ///
        let SQL2 = "UPDATE projeto_atividade SET esforco_atual = ?,  percentual_completo = ? WHERE id = ?";
        await db.run(SQL2, [EsforcoAtual, Perc_Completo, data.id_atividade]);
    }
    updateProjectTimeEntries(data.id_atividade);
}

async function updateProjectTimeEntries(id_atividade) {
    const result = await db.all(`SELECT 
            avg(percentual_completo) as andamento_projeto, 
            sum(esforco_atual) as esforco_atual,
            sum(esforco_estimado) as esforco_estimado,
            id_projeto
        FROM projeto_atividade
        WHERE id_projeto = (SELECT id_projeto FROM projeto_atividade WHERE id = ?) `, [id_atividade]);
    if(result) {
        let EsforcoAtual = result[0].esforco_atual;
        let esforco_estimado = result[0].esforco_estimado;
        let Percentual = (EsforcoAtual * 100) / esforco_estimado;//result[0].andamento_projeto;
        let IDProjeto = result[0].id_projeto;
        let SQL2 = `UPDATE projeto SET
                        esforco_real = ?,
                        esforco_estimado = ?,
                        percentual_completo = ?
                    WHERE id = ?`;
        await db.run(SQL2, [EsforcoAtual, esforco_estimado, Percentual, IDProjeto]);
    }
}

async function saveNewTask(data, project_id, user_id) {
    let SQL = `INSERT INTO projeto_atividade VALUES 
        (null, ${project_id}, ${data.group}, '${data.title}', '${data.description}', '${data.start_date}', '${data.due_date}', null, null,
        1, ${data.estimated_effort}, 0, ${user_id}, ${user_id}, DATETIME('now'), DATETIME('now'), null, 0)`;
    return await db.run(SQL);
}

async function getFinancesInfo(id, valor_hora) {
    const nonPaidEntries = await db.all(`SELECT sum(esforco) as totalHoras
            , (sum(esforco) * ${valor_hora}) as totalDinheiro
        FROM projeto_atividade_apontamento 
        where id_atividade in (select id from projeto_atividade where id_projeto = ${id})
        and pago = 0`);
    const paidEntries = await db.all(`SELECT 
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
    const data = await db.all(`SELECT * FROM projeto_atividade WHERE id = ?`,[id]);
    var i = 0;//*
    for (const item of data) {
        var idUser = item.id_responsavel;
        var temp1 = await db.all("SELECT nome, foto, email FROM usuario WHERE id = ?", [idUser]);
        data[i]['responsavel'] = temp1[0];

        var persons = await db.all(`SELECT nome, foto, email FROM projeto_atividade_participante a
                LEFT JOIN usuario b ON (b.id = a.id_usuario)
                WHERE id_atividade = ?`, [item.id]);
        data[i]['participantes'] = persons;
        i++;
    }//*/
    return data[0];
}

async function getActivitiesUser(idEmpresa) {
    const data = await db.all(`SELECT a.*, b.nome as nome_usuario FROM usuario_tarefa a 
    JOIN usuario b ON (b.id = a.id_usuario AND b.id_empresa = ?)
    ORDER BY inicio_estimado ASC`,[idEmpresa]);
    return data;
}

async function saveActivityTimeEntry(fields) {
    let data = await db.get("INSERT INTO usuario_tarefa_apontamento VALUES (null, ?, ?, ?, ?, ?, DATETIME('now'), DATETIME('now')) RETURNING *",
        [fields.id_atividade, fields.id_usuario, fields.data, fields.esforco, fields.observacao]);
    if(data) {
        await db.run("UPDATE usuario_tarefa SET esforco_real = esforco_real + ? WHERE id = ?",[fields.esforco, fields.id_atividade]);
        await db.run("UPDATE usuario_tarefa SET percentual_completo = (esforco_real * 100) / esforco_estimado WHERE id = ?",[fields.id_atividade]);
    }
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
    saveProject,
    saveTimeEntry,
    updateProjectTimeEntries,
    saveNewTask,
    getFinancesInfo,
    getActivity,
    getActivitiesUser,
    saveActivityTimeEntry,
}