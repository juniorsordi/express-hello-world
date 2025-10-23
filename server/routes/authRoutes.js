import express from "express";
const router = express.Router();
//const auth = require("../middleware/auth");
//const controller = require('../controllers/auth');
import * as controller from '../controllers/auth.js';
//const mailer = require("../infra/mailer");
import * as mailer from "../infra/mailer.js";

router.post("/auth/login", async function (req, res, next) {
    try {
        // Get user input
        const { email, password } = req.body;
        const user = await controller.userLoginMongo(email, password);
        console.log(user);
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
            //res.cookie("IDEmpresa", user.id_empresa, { maxAge: 86400000 });
            res.cookie("token", user.token, { maxAge: 86400000 });
            //*/
            //req.session.loggedin = true;
            //req.session.userID = user.id;
            //req.session.user = user;
            //req.session.token = user.token;
            //req.session.save(function(err) { console.log(err); });
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

router.get("/auth/sendEmail", async function (req, res, next) {
    //let resp = seq1.connect();
    let resp = await mailer.send({
        to: 'juniorsordi@gmail.com',
        subject: 'Node Email Test',
        html: '<h1>Node Email Test</h1>'
    });
    res.status(200).json(resp);
});

router.get("/auth/checkToken2", async function (req, res, next) {
    let currentEpoch = Math.floor(new Date().getTime() / 1000);
    let expireEpoch = 1700221422;
    let diff = expireEpoch - currentEpoch;
    diff = (diff / 60) / 60;
    res.status(200).json({ diff });
});

router.get("/auth/checkToken", async function (req, res, next) {
    let token = req.cookies.token;
    
    try {
        const payload = jwt.verify(token, process.env.TOKEN_KEY);
        let currentEpoch = Math.floor(new Date().getTime() / 1000);
        let expireEpoch = payload.exp;
        let diff = expireEpoch - currentEpoch;
        diff = (diff / 60) / 60;
        if( diff < 1) {
            delete payload.iat;
            delete payload.exp;
            delete payload.nbf;
            delete payload.jti;
            let decoded = jwt.sign(payload, process.env.TOKEN_KEY);
            res.status(200).json(decoded);
        } else {
            res.status(200).json(payload);
        }
    } catch (err) {
        res.status(200).json({ valid: false, error: "Unauthorized! Invalid Token" });
    }
    
});

router.get("/auth/testPwd", async function (req, res, next) {
    try {
        const test = await controller.testePassword();
        res.status(200).json(test);
    } catch (err) {
        res.status(200).json({ valid: false, error: "Unauthorized! Invalid Token" });
    }
});

export default router; 