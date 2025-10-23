import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config({ debug: true, path: ".env" });

const app = express();
// #############################################################################
// Logs all request paths and method
/*
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  //res.set('x-powered-by', 'Vercel.app')
  //console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});
//*/
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json({limit: '250mb'})); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true, limit: '250mb', parameterLimit: 10000000 })); // support encoded bodies
//app.use(cookieParser());
//app.use(session({ secret: 'XASDASDA', saveUninitialized: false, resave: false, cookie: { maxAge: oneDay } }));

//app.use(fileupload({ useTempFiles: true, tempFileDir: "/tmp", }))
//app.use(express.static('public', options))
app.all(/(.*)/, function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
	res.header('Access-Control-Max-Age', 60000);
	//console.log(req.session);
	next();
});

// #############################################################################
// Catch all handler for all other request.
// respond with "hello world" when a GET request is made to the homepage
app.get('/api/test', function (req, res) {   res.send('hello world');  });
//app.get('/apiweb/notificacoes/naolidas', function (req, res) { res.json([]); });
/*
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
app.use('/api/v1/g4f', require('./server/routes/g4fRoute'));
app.use("/api/v1/company", require("./server/routes/companyRoute"));
app.use("/api/v1/sistema", require("./server/routes/sistemaRoute"));
app.use("/api/v1/usuario", require("./server/routes/usuarioRoutes"));
app.use('/api/v1/', require('./server/routes/meudinheiroRoutes'));
//app.use('/api/v2/', require('./server/routes/meudinheiroRoutes2'));
app.use('/api/v1/tickets', require('./server/routes/tickets.routes'));
app.use('/api/dtibet', require('./server/routes/dtibetRoutes'));
//*/

let d = new Date()
console.log(""+d);


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
