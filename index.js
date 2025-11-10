import express from "express";
import cors from "cors";
import { connectDB } from "./db/connection.js";
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz
import rootRouter from "./routes/root.js";
app.use("/", rootRouter);

// Rota para usuários
import usuariosRouter from "./routes/usuariosRouter.js";
app.use("/api/usuarios", usuariosRouter);

// Rota para animais
import animaisRouter from "./routes/animaisRouter.js";
app.use("/api/animais", animaisRouter);

// Rota para validações
import validatorRouter from "./routes/validatorRouter.js";
app.use("/api/validators", validatorRouter);

try {
    await connectDB();
    app.listen(port)
    console.log("Servidor rodando na porta: " + port);
}
catch (error) {
    console.log("Erro: " + error.message);
}