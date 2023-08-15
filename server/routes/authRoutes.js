const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const seq1 = require("../infra/sequelize");
const auth = require("../middleware/auth");

router.post("/auth/login", async function (req, res, next) {
    try {
        // Get user input
        const { email, password } = req.body;
        const user = await controller.userLogin(email, password);
        // user
        if (user) {
            res.cookie("access_token", user.token, {
                httpOnly: true,
                maxAge: 86400000,
                secure: process.env.NODE_ENV === "production",
            });
            //
            res.cookie("user", user, { maxAge: 86400000 });
            res.cookie("IDUser", user.id, { maxAge: 86400000 });
            //*/
            req.session.loggedin = true;
            req.session.userID = user.id;
            //req.session.user = user;
            req.session.token = user.token;
            req.session.save(function(err) { console.log(err); });
            res.status(200).json(user);
        } else {
            res.status(200).json({ success: false, msg: "Invalid Credentials" });
        }

    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/auth/logout", async function (req, res, next) {
    req.session.destroy();
    res.status(200).json([]);
});

router.post("/auth/register", async function (req, res, next) {
    let response = await controller.userRegister(req.body);
    if(response) {
        response.success = true;
        response.Msg = "Conta criada com sucesso!";
    }
    res.status(200).json(response);
});

router.get("/test/seq", async function (req, res, next) {
    let resp = seq1.connect();
    res.status(200).json(resp);
});

router.get("/auth/checkToken", async function (req, res, next) {
    res.status(200).json(req.session);
});

module.exports = router;