const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/finances");
const service = require("../services/financeAccountService");

router.get("/accounts", auth, async function (req, res, next) {
    try {
        res.json(await service.getContasBancarias(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/accountsIncome", auth, async function (req, res, next) {
    try {
        res.json(await controller.getDashboardAcountsIncome(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;