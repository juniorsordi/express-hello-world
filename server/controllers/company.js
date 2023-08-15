const { Sequelize, DataTypes } = require('sequelize');
const db = require("../infra/database");
const sequelize = require("../infra/sequelize");

const Company = sequelize.define('empresa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    logo: {
        type: Sequelize.STRING,
    },
    id_tipo_login: {
        type: Sequelize.INTEGER,
    },
    servidor_ad: {
        type: Sequelize.STRING,
    },
    ativo: {
        type: Sequelize.INTEGER,
    },
});

async function getCompanyUsers(idEmpresa) {
    //var year = moment().format('YYYY');
    const data = await db.all(`SELECT * FROM usuario WHERE id_empresa = ? ORDER BY nome ASC`, [idEmpresa]);
    return data;
}

async function getCompanyProjectTypes(idEmpresa) {
    const data = await db.all("SELECT id, descricao as label FROM projeto_tipo WHERE id_empresa = ? AND ativo = 1", [idEmpresa]);
    return data;
}

async function getCompanyClients(idEmpresa) {
    const data = await db.all("SELECT id, nome_cliente as label FROM empresa_cliente WHERE id_empresa = ? AND ativo = 1", [idEmpresa]);
    return data;
}

async function getCompanyCategories(idEmpresa) {
    const data = await db.all("SELECT id, descricao as label FROM empresa_categoria WHERE id_empresa = ?", [idEmpresa]);
    return data;
}

async function getCompanyStatus(idEmpresa) {
    const data = await db.all("SELECT id, descricao as label, cor as color FROM projeto_situacao WHERE id_empresa = ?", [idEmpresa]);
    return data;
}

async function getCompanyActivityStatus(id) {
    const data = await db.all(`SELECT * FROM projeto_atividade_situacao WHERE id_empresa = ?`, [id]);
    return data;
}

async function saveCompanyClient(fields, idEmpresa) {
    const data = await db.run("INSERT INTO empresa_cliente (nome_cliente, logo, id_empresa, ativo) VALUES (?, ?, ?, 1)", [fields.nome_cliente, fields.logo, idEmpresa]);
    return data;
}

async function saveCompanyCategory(fields, idEmpresa) {
    const data = await db.all("INSERT INTO empresa_categoria (descricao, id_empresa) VALUES (?, ?)", [fields.label, idEmpresa]);
    return data;
}

async function saveCompanyStatus(fields, idEmpresa) {
    const data = await db.run("INSERT INTO projeto_situacao VALUES (null, ?, ?, null, 1, 0, DATETIME('now'))", [idEmpresa, fields.label]);
    return data;
}

async function getAllCompanies() {
    await sequelize.sync();
    const empresas = await Company.findAll();
    console.log(empresas);
    return empresas['empresa'].dataValues;
}

async function createCompany(nome) {
    let data = await db.get("INSERT INTO empresa VALUES (null, ?, null, 1, null, 1) returning *", [nome]);//*/
    //const data2 = await db.all("SELECT * FROM empresa WHERE nome = ?", [nome]);
    return data;
}

module.exports = {
    getCompanyProjectTypes,
    getCompanyClients,
    getCompanyCategories,
    getCompanyStatus,
    getCompanyActivityStatus,
    getCompanyUsers,
    saveCompanyClient,
    saveCompanyCategory,
    saveCompanyStatus,
    getAllCompanies,
    createCompany
}