/*
const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//*/

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
//import "./loadEnvironment.js";
//import "express-async-errors";
//import posts from "./routes/posts.js";
import mongoose from "mongoose";

import hospitalRoutes from "./server/routes/hospitalRoutes.js";
import usuarioRoutes from "./server/routes/usuarioRoutes.js";

import authRoutes from "./server/routes/authRoutes.js";
import { PessoasModel, UsuarioModel } from "./server/models/pessoas.js";

import chalk from 'chalk';
import fs from 'fs';

function pegaArquivo(caminhoDoArquivo) {
  const enconding = 'utf-8';
  fs.readFile(caminhoDoArquivo, enconding, (_, texto) => {
    console.log(chalk.green(texto));
  })
}

dotenv.config({ debug: true, path: ".env" });

const port = process.env.PORT || 3000
const app = express();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  //res.set('x-powered-by', 'Vercel.app')
  //console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

app.all(/(.*)/, function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
  res.header('Access-Control-Max-Age', 60000);
  //console.log(req.session);
  next();
});
try {
  ///mongoose.set("strictQuery", false);
  
  const url = process.env.ATLAS_URI;//'mongodb://root:password@127.0.0.1:27017/hospital?authSource=admin'
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });/*
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));//*/
  const db = mongoose.connection;
  db.once('open', _ => {
    console.log('Database connected:', url)
  });

  db.on('error', err => {
    console.error('connection error:', err)
  });

  ///
  // Load the /posts routes
  //app.use("/posts", posts);
  app.use('/api/', authRoutes);
  app.use('/api/v1/hospital/pessoas', hospitalRoutes);
  
  app.use('/api/v1/hospital/usuarios', usuarioRoutes);

  app.get('/api/test', async function (req, res) {
    const tennisPlayers = await UsuarioModel.find({}).exec();
    //await UsuarioModel.createCollection();
    //await UsuarioModel.create({ nome: "Dilson Sordi Junior", email: "juniorsordi@gmail.com", senha: "123456", empresa: "G4F", ativo: true });
    res.send(tennisPlayers);
  });

  app.get('/api/test/pessoa', async function (req, res) {
    let pessoa = await PessoasModel.find({
      cpf: req.query.cpf
    }).exec();
    if (pessoa.length == 0) {
      pessoa = await PessoasModel.create({ nome: "Dilson Sordi Junior", cpf: "13783002036", data_nascimento: "2022-01-01", cep: "12345678", logradouro: "Rua 1", numero: "1", bairro: "Bairro 1", cidade: "Cidade 1", estado: "Estado 1", plano_saude: "Plano 1" });
    }
    res.send(pessoa);
  })
  //*/
  app.use((err, _req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Uh oh! An unexpected error occured.")
  })
} catch (error) {
  console.error("Error:", error);
  app.response.status(500).send(error);
}


//await SomeModel.create({ nome: "Dilson Sordi Junior", cpf: "03543977962", data_nascimento: "2022-01-01", cep: "12345678", logradouro: "Rua 1", numero: "1", bairro: "Bairro 1", cidade: "Cidade 1", estado: "Estado 1", plano_saude: "Plano 1" });

// Global error handling
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

// start the Express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});