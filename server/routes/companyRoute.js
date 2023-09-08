const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/company');
const service = require('../services/companyService');

router.get("/company/users", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyUsers(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/company/projectTypes", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyProjectTypes(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/company/status", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyStatus(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/company/status", auth, async function (req, res, next) {
    try {
        const data = await controller.saveCompanyStatus(req.body, req.cookies.user.id_empresa);
        res.json(data);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/company/clients", auth, async function (req, res, next) {
    try {
        console.log(req.cookies.user.id_empresa);
        res.json(await service.getCompanyClients(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/company/clients", auth, async function (req, res, next) {
    try {
        const data = await service.saveCompanyClient(req.body, req.cookies.user.id_empresa);
        res.json(data);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/company/categories", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyCategories(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/company/categories", auth, async function (req, res, next) {
    try {
        const data = controller.saveCompanyCategory(req.body, req.cookies.user.id_empresa);
        res.json(data);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/company/list", auth, async function (req, res, next) {
    try {
        const data = controller.getAllCompanies();
        res.json(data);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/company/activity_status", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyActivityStatus(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;