const database = require("../infra/database");
var moment = require("moment");

async function dashboardRanking(idEmpresa) {
    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var hoje = moment().format('YYYY-MM-DD');
    var SQL = `SELECT  b.nome as usuario, 
                b.foto as imagem,
                coalesce(sum(esforco),0) as total_horas
                from projeto_atividade_apontamento a
                join usuario b on (b.id = a.id_usuario and b.id_empresa = $1)
                where a.data_apontamento between $2 and $3
                group by b.nome, b.foto`;
    const data = await database.any(SQL, [idEmpresa, startDate, hoje]);
    return data;
}

async function dashboardProjects(idEmpresa) {
    const data = await database.any(`SELECT b.descricao as situacao, coalesce(count(p.id),0) as total FROM projeto p
        LEFT JOIN projeto_situacao b ON (b.id = p.id_status)
        WHERE p.id_status is not null AND p.id_empresa = $1
        group by b.descricao`, [idEmpresa]);
    return data;
}

async function dashboardProjectsByYear(idEmpresa) {
    const data = await database.any(`SELECT substr(termino_estimado,0,4) as ano, coalesce(count(id),0) as total FROM projeto
            where  termino_estimado is not null and substr(termino_estimado,0,4) > '2019' and id_status = 3 AND id_empresa = $1
            group by substr(termino_estimado,0,4)
            order by $1`, [idEmpresa]);
    return data;
}

async function dashboardGraphByType(idEmpresa, year) {
    //var year = moment().format('YYYY');
    const data = await database.any(`SELECT 
                (select nome from projeto_tipo where id = c.id_categoria) as tipo_projeto, 
                sum(esforco) as total 
            from projeto_atividade_apontamento a
            left join projeto_atividade b on (b.id = a.id_atividade)
            left join projeto c on (c.id = b.id_projeto)
            WHERE substr(a.data_apontamento, 0,4) = $1 AND c.id_empresa = $2
            group by c.id_categoria 
            order by 2 DESC`, [year, idEmpresa]);
    return data;
}

async function dashboardGraphByClient(idEmpresa, year) {
    //var year = moment().format('YYYY');
    const data = await database.any(`SELECT 
                (select nome from empresa_cliente where id = c.id_cliente) as cliente, 
                coalesce(sum(esforco),0) as total from projeto_atividade_apontamento a
            left join projeto_atividade b on (b.id = a.id_atividade)
            left join projeto c on (c.id = b.id_projeto)
            WHERE substr(a.data_apontamento, 0, 4) = $1 and c.id_empresa = $2
            group by c.id_cliente 
            order by 2 DESC`, [year, idEmpresa]);
    return data;
}

module.exports = {
    dashboardRanking,
    dashboardProjects,
    dashboardProjectsByYear,
    dashboardGraphByType,
    dashboardGraphByClient,
    //addTaskProject,
}