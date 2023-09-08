var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const mongo = require("../infra/mongo");
var ObjectId = require('mongodb').ObjectId;

async function listProjects(idEmpresa) {
    try {
        const collection = mongo.db("DSJ").collection("projetos");
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: { nome: 1 },
            //projection: { _id: 1, nome: 1, email: 1, is_admin: 1, ativo: 1 },
        };
        const accountsList = await collection.find({ id_empresa: idEmpresa }, options).toArray(function (err, docs) { return docs; });
        return accountsList;
    } catch (err) {
        console.log(err);
    }
}

async function saveProject(fields, id_user) {
    try {
        fields.id_usuario_criacao = id_user.email;
        fields.criado_em = new Date().toISOString();
        fields.atividades = [];
        fields.inicio_estimado = new Date(fields.inicio_estimado).toISOString();
        fields.termino_estimado = new Date(fields.termino_estimado).toISOString();
        fields.inicio_real = null;
        fields.termino_real = null;
        fields.receita_estimada = (fields.esforco_estimado * fields.valor_hora);//fields.budget;
        fields.receita_real = 0;
        fields.custo_estimado = 0;
        fields.custo_real = 0;
        fields.percentual_completo = 0;
        fields.id_empresa = 1;
        //fields.esforco_estimado = fields.estimated_effort;
        //fields.valor_hora = fields.hour_value;
        fields.esforco_real = 0;

        const collection = mongo.db("DSJ").collection("projetos");
        const insertOneResult = await collection.insertOne(fields);
        console.log(`item successfully inserted.\n`);
        return insertOneResult;
    } catch (err) {
        console.log(err);
    }
}

async function getProject(id) {
    try {
        const collection = mongo.db("DSJ").collection("projetos");
        const list = await collection.findOne({ _id: new ObjectId(id) });
        list.expected_payment = list.esforco_real * list.valor_hora;
        return list;
    } catch (err) {
        console.log(err);
    }
}

async function updateProject(id, project) {
    try {
        const collection = mongo.db("DSJ").collection("projetos");
        const list = await collection.findOne({ _id: new ObjectId(id) });
        list.expected_payment = list.esforco_real * list.valor_hora;
        return list;
    } catch (err) {
        console.log(err);
    }
}

async function addTaskProject(task, id) {
    try {
        const collection = mongo.db("DSJ").collection("projetos");
        task.expected_payment = task.esforco_real * task.valor_hora;
        task.id_responsavel = new ObjectId('64dc1b36e19579c34dd2a889');
        const list = await collection.updateOne({ _id: new ObjectId(id) }, {
            $push: {
                "atividades": task
            }
        });
        
        return list;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    listProjects,
    saveProject,
    getProject,
    updateProject,
    addTaskProject,
}