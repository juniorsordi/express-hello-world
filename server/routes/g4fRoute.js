const express = require('express');
const router = express.Router();
const moment = require("moment");
const auth = require("../middleware/auth");
const service = require("../services/G4FService");
const utils = require("../infra/utils");
const database = require("../infra/database");

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

router.get("/dashboard", async function (req, res, next) {
    try {
        let info = await service.listarDadosDashboard();
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/ordemServico", async function (req, res, next) {
    try {
        let info = await service.listarOrdemServico(req.cookies.IDUser);
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
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
            let temp = await utils.testeDocx(item);
            //res.download("./output/"+item.numero_os+".docx");
            res.json(temp);
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

router.get("/controleMudanca/:id/detalhamento", async function (req, res, next) {
    try {
        res.json(await service.listarDetalhamentoControleMudanca(req.params.id));
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

router.get("/rh/ferias", async function (req, res, next) {
    try {
        let info = await service.listarFerias();
        res.status(200).json(info);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/tickets/dashboard/status", auth, async function (req, res, next) {
    try {
        res.json(await service.getDashboardStatusTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/tickets/dashboard/lastTickets", auth, async function (req, res, next) {
    try {
        res.json(await service.getDashboardLastTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/tickets/list", auth, async function (req, res, next) {
    try {
        res.json(await service.getAllTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/tickets/:id", auth, async function (req, res, next) {
    try {
        res.json(await service.getTicketByID(req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/tickets/", auth, async function (req, res, next) {
    try {
        req.body.user_id = req.cookies.IDUser;
        res.json(await service.saveTicket(req.body, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/tickets/:id/event", auth, async function (req, res, next) {
    try {
        req.body.user_id = req.cookies.IDUser;
        res.json(await service.saveTicketEvent(req.body, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/sistema/salvar", async function (req, res, next) {
    try {
        let fields = req.body;
        let tabela = req.query.tabela;
        let campos = Object.keys(fields);
        let valores = Object.values(fields);
        let SQL = `INSERT INTO g4f.${tabela} (id, `;
        SQL += campos.join(", ");
        let temp1 = [];
        for (let index = 0; index < campos.length; index++) {
            temp1.push("$"+(index+1));
        }
        SQL += ") VALUES (DEFAULT, "+temp1.join(", ")+") RETURNING *";
        let resposta = await database.one(SQL, valores);

        res.json(resposta);
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

router.get("/sistema/listagemSimples", async function (req, res, next) {
    try {
        res.json(await service.listagemSimplesTabela(req.query.tabela));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;