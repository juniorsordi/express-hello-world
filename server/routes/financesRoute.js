const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/finances');

router.get("/finances/payments", auth, async function (req, res, next) {
    try {
        res.json(await controller.getContasPagar(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/finances/payments", auth, async function (req, res, next) {
    try {
        res.json(await controller.savePayments(req.body, req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/receipts", auth, async function (req, res, next) {
    try {
        res.json(await controller.getContasReceber(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/cashFlow", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCashFlow(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/finances/receipts", auth, async function (req, res, next) {
    try {
        res.json(await controller.saveReceipts(req.body, req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;