const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dashboardService = require("../services/projectDashboardService");

router.get("/ranking", auth, async function (req, res, next) {
    try {
        res.json(await dashboardService.dashboardRanking(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/projects", auth, async function (req, res, next) {
    try {
        res.json(await dashboardService.dashboardProjects(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/projectsYear", auth, async function (req, res, next) {
    try {
        res.json(await dashboardService.dashboardProjectsByYear(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/graphByType", auth, async function (req, res, next) {
    try {
        res.json(await dashboardService.dashboardGraphByType(req.cookies.user.id_empresa, req.query.ano));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/graphByClient", auth, async function (req, res, next) {
    try {
        res.json(await dashboardService.dashboardGraphByClient(req.cookies.user.id_empresa, req.query.ano));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/projectsFinished", auth, async function (req, res, next) {
    try {
        res.json(await controller.dashboardProjectsFinished(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;