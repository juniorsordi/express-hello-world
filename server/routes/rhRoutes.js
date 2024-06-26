const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const utils = require('../infra/utils');
const service = require('../services/rhService');

router.post("/ponto/bater", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.salvarBatidaPonto({ id_usuario });
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/ponto/ultimos", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.listarUltimasBatidas(id_usuario);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.calculoBancoHorasUsuario(id_usuario);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/saldo_horas_mes", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.listarSaldoHoras(id_usuario);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;