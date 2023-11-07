const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const service = require("../services/agendamentoService");

router.get("/agendamento/usuario/notificacoes", auth, async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/agendamento/prestadores", auth, async function (req, res, next) {
    try {
        let lista = await service.getAgendamentoPrestadores();
        res.json(lista);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/agendamento/areas", auth, async function (req, res, next) {
    try {
        let lista = await service.getAgendamentoAreas();
        res.json(lista);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/agendamento/usuario/agenda?id=1", auth, async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/agendamento/usuario/agenda/passados?id=1", auth, async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;