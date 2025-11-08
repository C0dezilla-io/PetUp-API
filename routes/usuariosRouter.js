import * as usuarioControllers from "../controllers/usuariosController.js";
import { validarToken } from "../validators/tokenValidator.js";
import express from "express";
const router = express.Router();

// Create
router.post("/", usuarioControllers.criarUsuario);

// Read All
router.get("/", validarToken, usuarioControllers.listarUsuarios);

// Read Only one
router.get("/:id", validarToken, usuarioControllers.listarUsuarioPorId);

// Update
router.patch("/:id", validarToken, usuarioControllers.alterarUsuario);

// Delete
router.delete("/:id", validarToken, usuarioControllers.deletarUsuario);

export default router;
