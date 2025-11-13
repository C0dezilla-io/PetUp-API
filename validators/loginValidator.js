import { Usuario } from "../models/usuarioSchema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

export async function validarLogin(req, res) {
    const { email, senha } = req.body;

    if(!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
    }

    try {
        // Validação de email
        const usuario = await Usuario.findOne({ email: email });
        if(!usuario) {
            return res.status(404).json({ mensagem: "E-mail não encontrado." });
        }

        // Validação de senha
        const senhaValidada = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValidada) {
            return res.status(401).json({ mensagem: "Senha incorreta. Por segurança, tente novamente." });
        }

        const tiposUsuario = { 
            is_adm: usuario.tipo_usuario.is_adm,
            is_tutor: usuario.tipo_usuario.is_tutor,
            is_ong: usuario.tipo_usuario.is_ong
        };

        const tipoUsuario = await Object.keys(tiposUsuario).find(key => tiposUsuario[key] === true || null);

        const payload = {
            userId:usuario.userId,
            tipo: tipoUsuario,
            cep: usuario.localizacao.cep
        };

        // Gera o token utilizando o userId e o tipo_usuario true, que expira em 1 dia
        const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '1d'});

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token,
            userId: usuario.userId,
            tipo_usuario: tipoUsuario
        });
    }
    catch(error) {
        console.error("Erro no processo de login:", error);
        return res.status(500).json({ mensagem: "Erro ao processar o login. Por segurança, tente novamente." });
    }
}