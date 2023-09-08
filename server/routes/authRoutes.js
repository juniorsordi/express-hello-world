const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const controller = require('../controllers/auth');

router.post("/auth/login", async function (req, res, next) {
    try {
        // Get user input
        const { email, password } = req.body;
        const user = await controller.userLoginPG(email, password);
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
    //let resp = seq1.connect();
    let resp = await controller.userLoginPG("dilson@sc.senac.br","123456");
    res.status(200).json(resp);
});

router.get("/test/manifestXML", async function (req, res, next) {
    res.status(200).json(await controller.processManifestXML());
});

router.get("/auth/checkToken", async function (req, res, next) {
    let token = req.cookies.access_token;
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        res.status(200).json(decoded);
    } catch (err) {
        res.status(200).json({ valid: false, error: "Unauthorized! Invalid Token" });
    }
    
});

module.exports = router;