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
app.use("/api/usuarios", usuariosRouter)

try {
    await connectDB();
    app.listen(port)
    console.log("Servidor rodando na porta: " + port);
}
catch (error) {
    console.log("Erro: " + error.message);
}