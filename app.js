require('dotenv').config();
const express = require('express')
const path = require("path");
const cors = require("cors");
var bodyParser = require('body-parser');
const session = require("express-session");
const cookieParser = require("cookie-parser");
var multer = require('multer');
const fileupload = require('express-fileupload');
const { Pool, Client } = require("pg");
var util = require("util");
const fs = require("fs");

const app = express();
// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  //console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

const oneDay = 1000 * 60 * 60 * 23;

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({ secret: 'XASDASDA', saveUninitialized: false, resave: false, cookie: { maxAge: oneDay } }));

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, '/tmp/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

async function getOutstandingMigrations(migrations = []) {
    const files = await util.promisify(fs.readdir)(__dirname+"/migrations/");
    const sql = await Promise.all(
        files
        .filter((file) => file.split(".")[1] === "sql")
        .filter((file) => !migrations.includes(file))
        .map(async (file) => ({
            file,
            query: await util.promisify(fs.readFile)(`${__dirname}/migrations/${file}`, {
            encoding: "utf-8",
            }),
        }))
    );

  return sql;
}

async function getClient() {
	let config = {};
	config.database = {};
	let localhost = process.env.DATABASE_LOCAL;
	config.database.port = process.env.DATABASE_PORT || 5432;
	if(localhost) {
		config.database.database = process.env.DATABASE_DB_LOCAL || "teste";
		config.database.user = process.env.DATABASE_USER_LOCAL || 'postgres';
		config.database.password = process.env.DATABASE_PW_LOCAL || '123456';
		config.database.host = process.env.DATABASE_HOST_LOCAL || 'localhost';
	} else {
		config.database.database = process.env.DATABASE_DB || "teste";
		config.database.user = process.env.DATABASE_USER || 'postgres';
		config.database.password = process.env.DATABASE_PW || '123456';
		config.database.host = process.env.DATABASE_HOST || 'localhost';
	}
    try {
        const client = new Client(config.database);
        //console.log(client);
        await client.connect();
        return client;
    } catch (error) {
        console.log(error);
    }
    
}

const upload = multer({ dest: "/tmp" });
var upload2 = multer({ //multer settings
  storage: storage
}).single('file');

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}))
// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  res.header('Access-Control-Max-Age', 60000);
  //console.log(req.session);
  next();
});

// #############################################################################
// Catch all handler for all other request.
/*
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
});
//*/

// respond with "hello world" when a GET request is made to the homepage
app.get('/api/test', function (req, res) {   res.send('hello world');  });
app.get('/apiweb/notificacoes/naolidas', function (req, res) { res.json([]); });
app.get('/apiweb/pagamentos', function (req, res) { res.json([]); });
app.get('/apiweb/filtros', function (req, res) { res.json([]); });

app.use('/api/', require('./server/routes/authRoutes'));

app.use('/api/sicoob/', require('./server/routes/sicoobRoute'));

app.use('/api/games', require('./server/routes/gamesRoutes'));

app.use("/api/agendamento", require("./server/routes/agendamentoRoutes"));

app.use("/api/v1/project", require("./server/routes/projectsRoute"));
app.use('/api/v1/project/dashboard', require('./server/routes/projectDashboardRoute'));
app.use('/api/v1/project/kanban', require('./server/routes/projectKanbanRoute'));

app.use("/api/v1/controleMudanca", require("./server/routes/controleMudancaRoute"));

app.use("/api/v1/finances", require("./server/routes/financesRoute"));
app.use('/api/v1/finances/dashboard', require('./server/routes/financesDashboardRoute'));
app.use('/api/v1/finances/accounts', require('./server/routes/financesAccountsRoute'));

app.use('/api/v1/rh', require('./server/routes/rhRoutes'));

app.use("/api/v1/company", require("./server/routes/companyRoute"));
app.use("/api/v1/sistema", require("./server/routes/sistemaRoute"));

app.use('/api/v1/', require('./server/routes/meudinheiroRoutes'));
//app.use('/api/v2/', require('./server/routes/meudinheiroRoutes2'));

app.use('/api/v1/tickets', require('./server/routes/tickets.routes'));

app.get('/execute/migration', async function(req, res) {
  try {
    const client = await getClient();
    // Check previous migrations
    let existingMigrations = [];
    try {
        let result = await client.query("SELECT * FROM migrations");
        existingMigrations = result.rows.map(r => r.file)
    } catch {
        console.warn("First migration");
    }
    
    // Get outstanding migrations
    const outstandingMigrations = await getOutstandingMigrations(
        existingMigrations
    );

    try {
        // Start transaction
        await client.query("BEGIN");

        let results = [];
        // Run each migration sequentially in a transaction
        for (let migration of outstandingMigrations) {
            console.log(migration.file);
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
})

app.post('/uploads', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    console.log(req.files);
    res.json({ error_code: 0, err_desc: null, files: req.files });
  })
});

app.post("/upload", upload.array("file"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}
/*

//*/

var errorHandler = function (err, req, res, next) {
  console.error(err);
  res.status(422);
  //res.send({ error: err });
  res.json({ message: err.message });
};

app.use(errorHandler);
process.on('uncaughtException', function (error) {
  console.error(error.stack);
});

module.exports = app
