import * as usuarioControllers from "../controllers/usuariosController.js";
import { validarToken } from "../validators/tokenValidator.js";
import { verificarPermissao } from "../validators/permissionValidator.js";
import express from "express";
const router = express.Router();

// Create
router.post("/", usuarioControllers.criarUsuario);

// Read All
router.get("/", usuarioControllers.listarUsuarios);

// Read All === location
router.get("/localizacao/", usuarioControllers.listarUsuariosPorLocalizacao);

// Read Only one
router.get("/:id", usuarioControllers.listarUsuarioPorId);

// Update
router.patch("/:id", validarToken, usuarioControllers.alterarUsuario);

// Delete
router.delete("/:id", validarToken, usuarioControllers.deletarUsuario);

export default router;
