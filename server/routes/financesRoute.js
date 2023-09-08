const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/finances');
const service = require("../services/financeAccountService");

router.get("/finances/dashboard/accounts", auth, async function (req, res, next) {
    try {
        res.json(await service.getContasBancarias(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/dashboard/accountsIncome", auth, async function (req, res, next) {
    try {
        res.json(await controller.getDashboardAcountsIncome(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/payments", auth, async function (req, res, next) {
    try {
        res.json(await controller.getContasPagar(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/ofx", auth, async function (req, res, next) {
    try {
        res.json(await controller.relatorioOFX(req.cookies.user.id_empresa));
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

router.put("/finances/payments", auth, async function (req, res, next) {
    try {
        res.json(await controller.updatePayments(req.body.fields, req.body.type, req.body.id));
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
        res.json(await controller.getCashFlow(req.cookies.user.id_empresa, req.query));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/paymentTypes", auth, async function (req, res, next) {
    try {
        res.json(await controller.getFormaspagamento(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/categories", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCategoriasFinancas(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/finances/report/categoryCards", auth, async function (req, res, next) {
    try {
        res.json(await service.getDashboardCategorias(2, req.cookies.user.id_empresa));
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
router.get("/finances/exchangeRates", async function (req, res, next) {
    try {
        //let dataExchange = await retrieveResponseStatus("https://api.deel.com/commons/exchange_rates");
        fetch("https://api.deel.com/commons/exchange_rates")
        .then(res => res.json())
            .then((json) => {
                // do something with JSON
                res.json(json);
            });
        
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;