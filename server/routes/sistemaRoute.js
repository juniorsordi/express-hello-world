const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
var fs = require("fs");
const service = require("../services/sistemaService");
const utils = require("../infra/utils");


router.get("/notificacoes", async function (req, res, next) {
    try {
        res.json(await service.listarNotificacoesNaoLidas(req.cookies.IDUser));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/mensagens", async function (req, res, next) {
    try {
        res.json(await service.listarMensagensUsuario(req.cookies.IDUser));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard", async function (req, res, next) {
    try {
        res.json(await service.dashboardSistema(req.cookies.user.id_empresa, req.cookies.IDUser));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/usuarios", async function (req, res, next) {
    try {
        res.json(await service.listarUsuarios(req.cookies));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get('/execute/migration', async function(req, res) {
  try {
    const client = await utils.getClient();
    // Check previous migrations
    let existingMigrations = [];
    try {
        let result = await client.query("SELECT * FROM migrations");
        existingMigrations = result.rows.map(r => r.file)
    } catch {
        console.warn("First migration");
    }
    
    // Get outstanding migrations
    const outstandingMigrations = await utils.getOutstandingMigrations( existingMigrations );

    try {
        // Start transaction
        await client.query("BEGIN");

        let results = [];
        // Run each migration sequentially in a transaction
        for (let migration of outstandingMigrations) {
            //console.log(migration.file);
            try {
                // Run the migration
                await client.query(migration.query.toString());
                // Keep track of the migration
                let temp = await client.query("INSERT INTO migrations (file) VALUES ($1)", [
                    migration.file,
                ]);
                results.push(temp);
            } catch (error) {
                console.log(error);
            }
            
        }

        // All good, we can commit the transaction
        await client.query("COMMIT");
        res.json(results);
    } catch (err) {
        // Oops, something went wrong, rollback!
        await client.query("ROLLBACK");
    } finally {
        // Don't forget to release the client!
        //client.release();
        client.end();
    }
  } catch (error) {
    //res.json({ error });
	console.log(error);
  }
});

router.post("/upload", async function(req, res) {
    let filename = req.files;
    //console.log(req);
    //res.json([]); return;
    if(filename) {
        try {
            if(req.body.url == '/finance/ofxreport') {
                const file = fs.readFileSync(filename.file.tempFilePath, 'utf8');
                let info = await utils.parseOFXFile(file);
                res.json(info);
            } else {
                res.json({});
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    //res.status(500).json({ message: "No file found" });
});

module.exports = router;