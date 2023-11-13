const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/projects');
//const service = require('../services/projectMongoService');
const services = require('../services/projectService');

///# PROJECT ROUTES
router.get("/", auth, async function (req, res, next) {
    try {
        res.json(await services.listProjects(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/", auth, async function (req, res, next) {
    try {
        res.json(await services.saveProject(req.body, req.cookies.user));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/:id", auth, async function (req, res, next) {
    try {
        res.json(await services.getProject(req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/:id/task", auth, async function (req, res, next) {
    try {
        res.json(await services.saveNewTask(req.body, req.params.id, req.cookies.user.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/:id/time_entry", auth, async function (req, res, next) {
    try {
        req.body.id_usuario = req.cookies.IDUser;
        res.json(await services.saveTimeEntry(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.put("/:id", auth, async function (req, res, next) {
    try {
        res.json(await service.updateProject(req.body, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/comment", auth, async function (req, res, next) {
    try {
        req.body.user_id = req.cookies.IDUser;
        res.json(await services.saveProjectComment(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/taskPayment", auth, async function (req, res, next) {
    try {
        res.json(await services.taskPayment(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/activity/:id", auth, async function (req, res, next) {
    try {
        res.json(await controller.getActivity(req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/activities/users", auth, async function (req, res, next) {
    try {
        res.json(await controller.getActivitiesUser(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/activities/:id/time_entry", auth, async function (req, res, next) {
    try {
        req.body.id_usuario = req.cookies.IDUser;
        res.json(await controller.saveActivityTimeEntry(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});


module.exports = router;