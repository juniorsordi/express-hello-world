import { UsuarioModel } from "../models/pessoas.js";

export async function listarUsuarios(req, res, next) {
    try {
        const usuarios = await UsuarioModel.find({}).exec();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function pegarUsuario(req, res, next) {
    try {
        const usuario = await UsuarioModel.findById(req.params.id).exec();
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function criarUsuario(req, res, next) {
    try {
        const usuario = await UsuarioModel.create(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}