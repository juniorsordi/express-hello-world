import mongoose from "mongoose";

const PessoasSchema = new mongoose.Schema({
        nome: String,
        data_nascimento: Date,
        cpf: String,
        telefone: String,
        email: String,
        numero_carteira_plano_saude: String,
        numero_cns: String,
        sexo: String,
        cep: String,
        logradouro: String,
        numero: String,
        bairro: String,
        cidade: String,
        estado: String,
        plano_saude: String
    });
const PessoasModel = mongoose.model("Pessoas", PessoasSchema);

const cursoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    categoria: String
});
const CursoModel = mongoose.model('Curso', cursoSchema);


const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    empresa: String,
    ativo: Boolean
});
const UsuarioModel = mongoose.model('Usuarios', usuarioSchema);

export { PessoasModel, CursoModel, UsuarioModel };