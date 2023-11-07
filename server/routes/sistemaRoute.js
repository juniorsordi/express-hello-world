const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const service = require("../services/sistemaService")

router.get("/notificacoes", async function (req, res, next) {
    try {
        res.json(await service.listarNotificacoesNaoLidas(req.cookies.IDUser));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/mensagens", async function (req, res, next) {
    try {
        res.json(await service.listarMensagensUsuario(req.cookies.IDUser));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;