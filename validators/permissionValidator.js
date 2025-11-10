export function verificarPermissao(req, res, next) {
    if(req.user.tipo === "is_adm") {
        next();
    }
    else {
        return res.status(403).json({ mensagem: "Acesso proibido. Você não tem permissão de administrador." });
    }
}