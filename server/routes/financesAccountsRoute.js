const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const accountsService = require('../services/financeAccountService');


router.get("/", auth, async function (req, res, next) {
    try {
        res.json(await accountsService.getContasBancarias(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post('/', auth, async function (req, res, next) {
    let account = req.body;
    account.id_empresa = req.cookies.user.id_empresa;
    res.json(await accountsService.saveAccount(account));
});

router.get('/categories', auth, async function (req, res, next) {
    res.json(await accountsService.getCategorias(req.cookies.user.id_empresa));
});

router.get('/testeOFX', auth, async function (req, res, next) {
    res.json(await accountsService.testeOFX(req.cookies.user.id_empresa));
});

router.post('/categories', auth, async function (req, res, next) {
    let category = req.body;
    category.id_empresa = req.cookies.user.id_empresa;
    res.json(await accountsService.saveCategory(category));
});

router.get('/:id/movimentacoes', async function (req, res, next) {
    res.json(await accountsService.getMovimentacoesPorConta(req.params.id, req.cookies.user.id_empresa, req.query));
});

router.post('/:id/movimentacoes', async function (req, res, next) {
    res.json(await accountsService.saveAccountMoviment(req.body, req.cookies.user.id_empresa));
});

module.exports = router;