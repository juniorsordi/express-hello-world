const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/company');
const service = require('../services/companyService');

router.get("/users", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyUsers(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/projectTypes", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyProjectTypes(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/status", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyStatus(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/status", auth, async function (req, res, next) {
    try {
        res.json(await controller.saveCompanyStatus(req.body, req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/clients", auth, async function (req, res, next) {
    try {
        res.json(await service.getCompanyClients(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/clients", auth, async function (req, res, next) {
    try {
        res.json(await service.saveCompanyClient(req.body, req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/categories", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyCategories(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/categories", auth, async function (req, res, next) {
    try {
        res.json(await controller.saveCompanyCategory(req.body, req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/list", auth, async function (req, res, next) {
    try {
        const data = await controller.getAllCompanies();
        res.json(data);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/activity_status", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyActivityStatus(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/project_type", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyProjectTypes(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/project_type", auth, async function (req, res, next) {
    try {
        res.json(await controller.saveCompanyProjectTypes(req.body, req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;