const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/company');

router.get("/company/users", auth, async function (req, res, next) {
    try {
        res.json(await controller.getCompanyUsers(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;