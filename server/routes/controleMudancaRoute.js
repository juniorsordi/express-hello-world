const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const utils = require('../infra/utils');
const service = require('../services/controleMudancaService');

router.get("/controlMudanca", async function (req, res, next) {
    try {
        let info = await service.listarControleMudancas();
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/controleMudanca/:id", async function (req, res, next) {
    try {
        let info = await service.pegarControleMudancas(req.params.id);
        if(req.query.download == 0) {
            res.status(200).json(info[0]);
        } else {
            let file = utils.gerarControleMudancaTemplate(info[0]);
            res.download("./output/"+file);
        }
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/controleMudanca", async function (req, res, next) {
    try {
        res.json(await service.salvarControleMudanca(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;