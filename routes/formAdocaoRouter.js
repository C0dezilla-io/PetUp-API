import * as adocaoController from "../controllers/formulariosController.js";
import { validarToken } from "../validators/tokenValidator.js";
import { verificarPermissao } from "../validators/permissionValidator.js";
import express from "express";
const router = express.Router();

// Create
router.post("/", validarToken, adocaoController.criarFormulario);

// Read All
router.get("/", adocaoController.listarFormularios);

// Read All === location
router.get("/localizacao/", adocaoController.listarFormulariosPorLocalizacao);

// Read Only one
router.get("/:id", adocaoController.listarFormularioPorId);

// Update
router.patch("/:id", validarToken, adocaoController.alterarFormulario);

// Delete
router.delete("/:id", validarToken, adocaoController.deletarFormulario);

export default router;
