import * as animalControllers from "../controllers/animaisController.js";
import { validarToken } from "../validators/tokenValidator.js";
import { verificarPermissao } from "../validators/permissionValidator.js";
import { uploadAnimal } from "../services/utilsService.js";
import express from "express";
const router = express.Router();

// Create
router.post("/", validarToken, uploadAnimal, animalControllers.criarAnimal);

// Read All
router.get("/", animalControllers.listarAnimais);

// Read All === responsavelId
router.get("/responsavel/:id", animalControllers.listarAnimaisPorResponsavel);

// Read All === location
router.get("/localizacao/", animalControllers.listarAnimaisPorLocalizacao);

// Read Only one
router.get("/:id", animalControllers.listarAnimalPorId);

// Update
router.patch("/:id", validarToken, animalControllers.alterarAnimal);

// Delete
router.delete("/:id", validarToken, animalControllers.deletarAnimal);

export default router;