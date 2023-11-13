const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/projects");

router.get("/:id", auth, async function (req, res, next) {
    try {
        res.json(await controller.listKanbanProjects(req.cookies.user.id_empresa, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.put("/:id", auth, async function (req, res, next) {
    try {
        ///await controller.updateKanbanAtividade(idAtividade, idSituacao);
        res.json(await controller.updateKanbanAtividade(req.body.id_atividade, req.body.id_situacao));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;