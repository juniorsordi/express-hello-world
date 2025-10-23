
import { PessoasModel } from "../models/pessoas.js";

export async function list(req, res, next) {
    try {
        const pessoas = await PessoasModel.find({}).exec();
        res.status(200).json(pessoas);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export async function get(req, res, next) {
    try {
        const pessoa = await PessoasModel.findById(req.params.id).exec();
        res.status(200).json(pessoa);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export async function create(req, res, next) {
    try {
        const pessoa = await PessoasModel.create(req.body);
        res.status(201).json(pessoa);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export async function update(req, res, next) {
    try {
        const pessoa = await PessoasModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        res.status(200).json(pessoa);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export async function deleted(req, res, next) {
    try {
        const pessoa = await PessoasModel.findByIdAndRemove(req.params.id).exec();
        res.status(200).json(pessoa);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
