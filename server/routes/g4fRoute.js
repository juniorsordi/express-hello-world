const express = require('express');
const router = express.Router();
const moment = require("moment");
const service = require("../services/G4FService");
const utils = require("../infra/utils");

router.get("/", async function (req, res, next) {
    try {
        res.json(await service.listProjects(req.cookies.user.id_empresa));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/auth/login", async function (req, res, next) {
    try {
        let user = await service.loginSistema(req.body);
        if (user) {
            res.cookie("access_token", user.token, {
                httpOnly: true,
                maxAge: 86400000,
                secure: process.env.NODE_ENV === "production",
            });
            //
            res.cookie("user", user, { maxAge: 86400000 });
            res.cookie("IDUser", user.id, { maxAge: 86400000 });
            res.cookie("IDEmpresa", user.id_empresa, { maxAge: 86400000 });
            res.cookie("token", user.token, { maxAge: 86400000 });
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

router.get("/controleMudanca", async function (req, res, next) {
    try {
        let info = await service.listarControleMudancas(req.cookies.IDUser);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/controleMudanca/:id", async function (req, res, next) {
    try {
        let info = await service.pegarControleMudancas(req.params.id);
        if(req.query.download == 1) {
            let item = info[0];
            //let file = utils.gerarControleMudancaTemplateG4F(info[0]);
            utils.testeDocx(item);
            res.download("./output/"+item.numero_os+".docx");
            //res.json(info[0]);
        } else {
            res.status(200).json(info[0]);
        }
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/controleMudanca", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        res.json(await service.salvarControleMudanca(req.body, id_usuario));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/controleMudanca/:id/detalhamento", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        res.json(await service.salvarDetalhamentoControleMudanca(req.body, id_usuario));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/rh/ponto/bater", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.salvarBatidaPonto({ id_usuario });
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/rh/ponto/ultimos", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.listarUltimasBatidas(id_usuario);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/rh/dashboard", async function (req, res, next) {
    try {
        let id_usuario = req.cookies.IDUser;
        let info = await service.calculoBancoHorasUsuario(id_usuario);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/sistema/usuarios", async function (req, res, next) {
    try {
        res.json(await service.salvarUsuario(req.body));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/sistema/usuarios", async function (req, res, next) {
    try {
        res.json(await service.listarUsuarios());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/sistema/tecnologias", async function (req, res, next) {
    try {
        res.json(await service.listarTecnologias());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;