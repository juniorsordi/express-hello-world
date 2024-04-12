const express = require('express');
const router = express.Router();

const service = require('../services/dtibetService');

router.get("/jogos", async function (req, res, next) {
    try {
        res.json(await service.listarJogos());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/proximosEventos", async function (req, res, next) {
    try {
        res.json(await service.getProximosEventos());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/:id/apostas", async function (req, res, next) {
    try {
        res.json(await service.getApostasByIdJogo(req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/aposta", async function (req, res, next) {
    try {
        res.json(await service.salvarAposta(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/jogo", async function (req, res, next) {
    try {
        res.json(await service.salvarJogo(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.put("/jogo", async function (req, res, next) {
    try {
        res.json(await service.atualizarJogo(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});


module.exports = router;