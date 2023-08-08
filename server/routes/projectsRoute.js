const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/projects');
const db = require("../mariadb");

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

router.get("/project/:id/unpaidEntries", auth, async function (req, res, next) {
    try {
        const data = await db.query("SELECT * from projeto_atividade_apontamento where id_atividade IN (SELECT id from projeto_atividade WHERE id_projeto = ?) and pago = 0", [req.params.id]);
        res.json(data);
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
        const data = await db.query("INSERT INTO projeto_situacao VALUES (null, ?, now(), ?, null)", [req.body.label, req.cookies.user.id_empresa]);
        res.json(data);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/company/clients", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyClients(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/company/clients", auth, async function (req, res, next) {
    try {
        const data = await db.query("INSERT INTO empresa_cliente (nome_cliente, logo, id_customer) VALUES (?, ?, ?)", [req.body.nome_cliente, req.body.logo , req.cookies.user.id_empresa]);
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
        const data = await db.query("INSERT INTO empresa_categoria (descricao, id_empresa) VALUES (?, ?)", [req.body.label, req.cookies.user.id_empresa]);
        res.json(data);
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

router.get("/company/activity_status", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyActivityStatus(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;