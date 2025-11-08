import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

export async function validarToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ mensagem: "Acesso negado. Token não fornecido ou formato inválido." });
    }

    // Quebra o texto do header para pegar só o token
    const token = authHeader.split(" ")[1];

    try {
        // Descriptografia do token
        const dados = await jwt.verify(token, JWT_SECRET);

        req.user = dados;

        next();
    }
    catch(error) {
        return res.status(403).json({ mensagem: "Token inválido ou expirado." });
    }
}