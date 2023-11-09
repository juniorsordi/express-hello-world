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

router.get("/agendamento/prestador/:id", auth, async function (req, res, next) {
    try {
        let lista = await service.getAgendamentoPrestadorByID(req.params.id);
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

router.get("/agendamento/usuario/agenda", auth, async function (req, res, next) {
    try {
        res.json([req.query]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/agendamento/usuario/agenda/passados", auth, async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/gym/list", auth, async function (req, res, next) {
    try {
        res.json(await service.getAcademiasAtivas());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

/// /agendamento/user/rating
/// /agendamento/time_grid
/// /sistema/prestador/
/// 
/// 
/// 
/// 

module.exports = router;