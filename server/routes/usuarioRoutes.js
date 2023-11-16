const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const service = require("../services/usuarioService");

router.get("/list", async function (req, res, next) {
    try {
        res.json(await service.listarUsuarios());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;