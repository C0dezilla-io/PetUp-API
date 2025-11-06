import * as usuarioControllers from "../controllers/usuariosController.js";
import express from "express";
const router = express.Router();

// Create
router.post("/", usuarioControllers.criarUsuario);

// Read All
router.get("/", usuarioControllers.listarUsuarios);

// Read Only one
router.get("/:id", usuarioControllers.listarUsuarioPorId);

// Update
router.patch("/:id", usuarioControllers.alterarUsuario);

// Delete
router.delete("/:id", usuarioControllers.deletarUsuario);

export default router;
