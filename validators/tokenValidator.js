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

    // Descriptografia do token
    jwt.verify(token, JWT_SECRET, (error, dados) => {
        if(error && error.name === "TokenExpiredError") {
            return res.status(403).json({ mensagem: "Token expirado. Por segurança, faça login novamente." });
        }
        else if(error) {
            return res.status(403).json({ mensagem: "Token inválido." });
        }
        
        req.user = dados;
        next();
    });
}