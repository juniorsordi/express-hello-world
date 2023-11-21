const express = require('express');
const router = express.Router();
const moment = require("moment");
const service = require("../services/G4FService");
const utils = require("../infra/utils");

router.get("/", async function (req, res, next) {
    try {
        res.json(await service.listProjects(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/controleMudanca", async function (req, res, next) {
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
        if(req.query.download == 1) {
            let file = utils.gerarControleMudancaTemplateG4F(info[0]);
            res.download("./output/"+file);
        } else {
            res.status(200).json(info[0]);
        }
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/controleMudanca", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        res.json(await service.salvarControleMudanca(req.body, id_usuario));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/rh/ponto/bater", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.salvarBatidaPonto({ id_usuario });
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/rh/ponto/ultimos", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.listarUltimasBatidas(id_usuario);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/rh/dashboard", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.calculoBancoHorasUsuario(id_usuario);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/sistema/usuarios", async function (req, res, next) {
    try {
        res.json(await service.listarUsuarios());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/sistema/tecnologias", async function (req, res, next) {
    try {
        res.json(await service.listarTecnologias());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;