var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const database = require("../infra/database");
const utils = require("../infra/utils");
var moment = require("moment");
moment.locale('pt-br');

async function listProjects(idEmpresa) {
    try {
        let SQL = `SELECT * FROM projeto WHERE id_empresa = $1 ORDER BY nome ASC`;
        return await database.any(SQL,[idEmpresa]);
    } catch (err) {
        console.log(err);
    }
}

async function loginSistema(fields) {
    try {
        let email = fields.email;
        let password = fields.password;
        // Validate user input
        if (!(email && password)) {
            //res.status(400).send("All input is required");
            return { success: false, msg: 'Email ou senha vazios'};
        }
        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(password.trim());
        var tempHash = hashPassword.digest('hex');
        // Validate if user exist in our database
        let emailC = email.trim();
        const user = await database.one("SELECT * FROM g4f.usuario WHERE email = $1", [emailC]);
        if (user && (tempHash == user.senha)) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email: emailC, foto: user.foto },
                `${process.env.TOKEN_KEY}`,
                {
                    expiresIn: "24h",
                }
            );
            user.initials = utils.createInitials(user.nome);
            // save user token
            user.success = true;
            user.token = token;
            return user;
        }
        return { success: false, msg: 'Usuário não encontrado' };
    } catch (err) {
        console.log(err);
    }
}

async function listarControleMudancas(idUser) {
    try {
        let SQL = `SELECT a.*
            , (SELECT nome FROM g4f.usuario WHERE id = a.analista_responsavel) as nome_analista
            , (SELECT nome FROM g4f.lista_tecnologias WHERE id = a.tecnologia) as nome_tecnologia
        FROM g4f.controle_mudancas a
        WHERE analista_responsavel = $1
        ORDER BY numero_os, data_cadastro, id ASC`;
        return await database.any(SQL, [idUser]);
    } catch (err) {
        console.log(err);
    }
}

async function salvarControleMudanca(fields, idUser) {
    try {
        if(fields.descricao == null) { fields.descricao = ""; }
        
        let SQL = `INSERT INTO g4f.controle_mudancas VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, null, $8, $9, $10, $11, 1, NOW(), $12) RETURNING *`;
        return await database.any(SQL, [fields.num_os,fields.sistema,fields.solicitante,fields.unidade,fields.analista,fields.tipo,
            fields.descricao,fields.tecnologia,fields.profissional_alocado,fields.tempo_gasto,fields.tempo_gasto_medida, idUser]);
    } catch (err) {
        console.log(err);
    }
}

async function salvarDetalhamentoControleMudanca(fields, idUser) {
    return fields;
}

async function pegarControleMudancas(id) {
    try {
        let SQL = `SELECT a.* 
            , (SELECT nome FROM g4f.usuario WHERE id = a.analista_responsavel) as nome_analista
            , (SELECT nome FROM g4f.lista_tecnologias WHERE id = a.tecnologia) as nome_tecnologia
            , (TO_CHAR(now(),'dd/mm/yyyy')) as data_atual
            --, (SELECT json_agg(json_build_object(id,nome_detalhamento,passo_passo,descricao,tipo,interface) from (SELECT * FROM controle_mudancas_detalhamento WHERE id_controle_mudancas = a.id))) as detalhes
        FROM g4f.controle_mudancas a
        WHERE a.id = $1`;
        let info = await database.any(SQL,[id]);

        let detalhamentos = await database.any("SELECT * FROM g4f.controle_mudancas_detalhamento WHERE id_controle_mudancas = $1", [id]);
        info[0].detalhamentos = detalhamentos;

        return info;
    } catch (err) {
        console.log(err);
    }
}

async function salvarBatidaPonto(fields) {
    let hoje = moment().utcOffset('-0300');
    let SQL = "INSERT INTO g4f.rh_batida_ponto VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) returning *";
    //*
    const info = await database.one(SQL, [
        fields.id_usuario,
        hoje.format('DD'),
        hoje.format('MM'),
        hoje.format('yyyy'),
        hoje.format('LTS'),
        hoje.format()
    ]);
    /*/
    let info = [
        fields.id_usuario,
        hoje.format('DD'),
        hoje.format('MM'),
        hoje.format('yyyy'),
        hoje.format('LTS'),
        hoje.format()
    ];//*/
    return info;
}

async function listarUltimasBatidas(idUser) {
    let SQL0 = `SELECT * FROM g4f.rh_batida_ponto
        WHERE id_usuario = $1
        ORDER BY dia DESC, mes DESC, ano DESC, hora DESC
        LIMIT 28`;
    let SQL = `SELECT dia, mes, ano 
        , (SELECT min(hora) from g4f.rh_batida_ponto where id_usuario = a.id_usuario and dia = a.dia and mes = a.mes and ano = a.ano) as entrada
        , (SELECT max(hora) from g4f.rh_batida_ponto where id_usuario = a.id_usuario and dia = a.dia and mes = a.mes and ano = a.ano) as saida
        , (age(max((ano || '-'||mes||'-'||dia||' '||hora)::timestamp), min((ano||'-'||mes||'-'||dia||' '||hora)::timestamp)) - interval '1 hour' )::time as dif
    FROM g4f.rh_batida_ponto a
    WHERE id_usuario = $1 
    GROUP BY dia, mes, ano, id_usuario
    ORDER BY dia DESC, mes DESC, ano DESC`
    const data = await database.any(SQL, [idUser]);
    return data;
}

async function calculoBancoHorasUsuario(idUser) {
    let mesAtual = moment().format("MM");
    let SQL1 = `SELECT distinct dia, mes, ano FROM g4f.rh_batida_ponto WHERE mes = $1 AND id_usuario = $2;`;
    const data = await database.any(SQL1, [mesAtual, idUser]);
    var i = 0;
    for (const element of data) {
        let SQL2 = `SELECT 
                        (age(max((ano || '-'||mes||'-'||dia||' '||hora)::timestamp), min((ano||'-'||mes||'-'||dia||' '||hora)::timestamp))  - interval '1 hour')::time as dif 
                FROM g4f.rh_batida_ponto a
                WHERE ano = $1 AND mes = $2 and dia = $3 and id_usuario = $4`
        let temp = await database.one(SQL2,[element.ano, element.mes, element.dia, idUser]);
        let temp2 = await database.one(`SELECT (AGE('2000-01-01 ${temp.dif}','2000-01-01 08:00:00')) as temp1`);
        element.saldo = temp2.temp1;
    }
    return data;
}

async function listarUsuarios() {
    let SQL = `SELECT * FROM g4f.usuario a ORDER BY nome ASC`;
    const data = await database.any(SQL);
    return data;
}

async function salvarUsuario(fields) {
    let senhaPadrao = crypto.createHash('sha1').update("123456").digest('hex');
    let SQL = `INSERT INTO g4f.usuario VALUES (DEFAULT, $1, $2, $3, null, 1, 0, true, 1) RETURNING *`;
    const data = await database.one(SQL, [fields.nome, fields.email, senhaPadrao]);
    return data;
}

async function listarTecnologias() {
    let SQL = `SELECT * FROM g4f.lista_tecnologias a ORDER BY nome ASC`;
    const data = await database.any(SQL);
    return data;
}

module.exports = {
    listProjects,
    loginSistema,
    listarControleMudancas,
    pegarControleMudancas,
    salvarControleMudanca,
    salvarDetalhamentoControleMudanca,
    salvarBatidaPonto,
    listarUltimasBatidas,
    calculoBancoHorasUsuario,
    listarUsuarios,
    salvarUsuario,
    listarTecnologias,
}