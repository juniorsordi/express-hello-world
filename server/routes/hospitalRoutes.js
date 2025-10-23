import express from "express";
const router = express.Router();
import * as pessoaController from "../controllers/pessoaController.js";

router.get("/list", pessoaController.list);

router.post("/", pessoaController.create);

router.get("/:id", pessoaController.get);

router.put("/:id", pessoaController.update);

router.delete("/:id", pessoaController.deleted);

//module.exports = router;
export default router; 