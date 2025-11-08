import express from "express";
import  { validarLogin } from "../validators/loginValidator.js";

const router = express.Router();

// Rota para validar login
router.post("/login", validarLogin);

export default router;