import express from "express";
const router = express.Router();
import * as service from '../services/usuarioService.js';

router.get("/", service.listarUsuarios);

router.get("/:id", service.pegarUsuario);

router.post("/", service.criarUsuario);

export default router; 