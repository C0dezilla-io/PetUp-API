import * as animalControllers from "../controllers/animaisController.js";
import { validarToken } from "../validators/tokenValidator.js";
import { verificarPermissao } from "../validators/permissionValidator.js";
import express from "express";
const router = express.Router();

// Create
router.post("/", validarToken, animalControllers.criarAnimal);

// Read All
router.get("/", validarToken, animalControllers.listarAnimais);

// Read All === responsavelId
router.get("/responsavel/:id", validarToken, animalControllers.listarAnimaisPorResponsavel);

// Read All === location
router.get("/localizacao/", validarToken, animalControllers.listarAnimaisPorLocalizacao);

// Read Only one
router.get("/:id", validarToken, animalControllers.listarAnimalPorId);

// Update
router.patch("/:id", validarToken, animalControllers.alterarAnimal);

// Delete
router.delete("/:id", validarToken, animalControllers.deletarAnimal);

export default router;