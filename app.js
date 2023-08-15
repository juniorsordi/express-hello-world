require('dotenv').config();
const express = require('express')
const path = require("path");
const cors = require("cors");
const app = express();
var bodyParser = require('body-parser');
const session = require("express-session");
const cookieParser = require("cookie-parser");


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
app.use(session({ secret: 'XASDASDA', saveUninitialized: true, resave: false, cookie: { maxAge: oneDay } }));

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
app.get('/api/test', function (req, res) { 
  res.send('hello world'); 
});

app.use('/api/', require('./server/routes/authRoutes'));
app.use('/api/v1/', require('./server/routes/projectsRoute'));
app.use('/api/v1/', require('./server/routes/companyRoute'));
app.use('/api/v1/', require('./server/routes/financesRoute'));

/*
app.use('/api/v1/', require('./server/routes/tickets.routes'));
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
