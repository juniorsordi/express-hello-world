const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/projects');

router.get("/dashboard/ranking", auth, async function (req, res, next) {
    try {
        res.json(await controller.dashboardRanking(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/projects", auth, async function (req, res, next) {
    try {
        console.log(req.session);
        res.json(await controller.dashboardProjects(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/projectsYear", auth, async function (req, res, next) {
    try {
        res.json(await controller.dashboardProjectsByYear(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/graphByType", auth, async function (req, res, next) {
    try {
        console.log(req.query);
        res.json(await controller.dashboardGraphByType(req.cookies.user.id_empresa, req.query.ano));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/graphByClient", auth, async function (req, res, next) {
    try {
        res.json(await controller.dashboardGraphByClient(req.cookies.user.id_empresa, req.query.ano));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/projectsFinished", auth, async function (req, res, next) {
    try {
        res.json(await controller.dashboardProjectsFinished(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/projects", auth, async function (req, res, next) {
    try {
        res.json(await controller.listProjects(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/kanbanProjects/:id", auth, async function (req, res, next) {
    try {
        res.json(await controller.listKanbanProjects(req.cookies.user.id_empresa, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.put("/kanbanProjects/:id", auth, async function (req, res, next) {
    try {
        ///await controller.updateKanbanAtividade(idAtividade, idSituacao);
        res.json(await controller.updateKanbanAtividade(req.body.id_atividade, req.body.id_situacao));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/project/:id", auth, async function (req, res, next) {
    try {
        res.json(await controller.getProject(req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.put("/project/:id", auth, async function (req, res, next) {
    try {
        res.json(await controller.updateProject(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/project/comment", auth, async function (req, res, next) {
    try {
        req.body.user_id = req.cookies.IDUser;
        res.json(await controller.saveProjectComment(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/project", auth, async function (req, res, next) {
    try {
        res.json(await controller.saveProject(req.body, req.cookies.user));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/project/:id/time_entry", auth, async function (req, res, next) {
    try {
        req.body.id_usuario = req.cookies.IDUser;
        res.json(await controller.saveTimeEntry(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/project/:id/task", auth, async function (req, res, next) {
    try {
        res.json(await controller.saveNewTask(req.body, req.params.id, req.cookies.user.id));
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