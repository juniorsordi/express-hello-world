const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/lancamentos", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/lancamentos/metasorcamento", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;