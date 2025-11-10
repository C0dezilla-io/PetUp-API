import * as usuarioServices from "../services/usuariosService.js";
import { BuscarEnderecoPorCep } from "../services/localizacaoService.js";
import bcrypt from "bcrypt";

// Create
export async function criarUsuario(req, res) {
    const { nome, email, senha, telefone, cep, numero, documento, tipo_usuario } = req.body;
    
    const cepLimpo = cep ? cep.replace(/\D/g, '') : null;
    
    if (!cepLimpo || cepLimpo.length !== 8) {
        return res.status(400).json({ mensagem: "CEP inválido. Deve conter 8 dígitos." });
    }

    const enderecoInfo = await BuscarEnderecoPorCep(cepLimpo);
    
    if (enderecoInfo.erro) {
        return res.status(400).json({ mensagem: "CEP inválido ou não encontrado.", detalhes: enderecoInfo.erro });
    }

    const dados = { nome,
        email,
        senha,
        telefone,
        documento,
        tipo_usuario,
        localizacao: {
            cep: cepLimpo,
            cidade: enderecoInfo.cidade,
            estado: enderecoInfo.estado,
            numero: numero
        }
    };
    dados.senha = await bcrypt.hash(dados.senha, 10);

    try {
        const newUsuario = await usuarioServices.CriarUsuario(dados);
        return res.status(201).json( newUsuario );
    }
    catch(error) {
        console.error("Erro ao criar usuário: ", error);
        return res.status(500).json({ mensagem: "Erro ao criar usuário. Por segurança, tente novamente." });
    }
}

// Read All
export async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuarioServices.ListarUsuarios();
        return res.status(200).json( usuarios );
    }
    catch(error) {
        console.error("Erro ao listar usuários: ", error);
        return res.status(500).json({ mensagem: "Erro ao listar usuários. Por segurança, tente novamente." });
    }
}

// Read Only one
export async function listarUsuarioPorId(req, res) {
    try {
        const id = req.params.id;

        const usuario = await usuarioServices.ListarUsuarioPorId(id);

        if(!usuario) {
            return res.status(404).json({ mensagem : "Usuário não encontrado." });
        }

        return res.status(200).json( usuario );
    }
    catch(error) {
        if (error.name === "CastError") { 
            return res.status(400).json({ mensagem: "Parâmetro 'Id de usuário' inválido." });
        }
        console.error("Erro ao listar usuário: ", error);
        return res.status(500).json({ mensagem: "Erro ao listar usuário. Por segurança, tente novamente." });
    }
}

// Update
export async function alterarUsuario(req, res) {
    try {
        const id = req.params.id;
        const dados = req.body;
        
        if(dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }

        if(dados.cep) {
            const cepLimpo = dados.cep ? dados.cep.replace(/\D/g, '') : null;
            dados.cep = cepLimpo;
        }
    
        const alterUsuario = await usuarioServices.AlterarUsuario(id, dados);

        if(!alterUsuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado para alteração." });
        }

        return res.status(200).json( alterUsuario );
    }
    catch(error) {
        if (error.name === "CastError") { 
            return res.status(400).json({ mensagem: "Parâmetro 'Id de usuário' inválido." });
        }
        console.error("Erro ao alterar usuário: ", error);
        return res.status(500).json({ mensagem: "Erro ao alterar usuário. Por segurança, tente novamente." });
    }
}

// Delete
export async function deletarUsuario(req, res) {
    try {
        const id = req.params.id;

        const result = await usuarioServices.DeletarUsuario(id);

        if(!result) {
            return res.status(404).json({ mensagem: "Usuário não encontrado para exclusão." });
        }

        return res.status(200).json({ mensagem : "Usuário excluido com sucesso." });
    }
    catch(error) {
        if (error.name === "CastError") { 
            return res.status(400).json({ mensagem: "Parâmetro 'Id de usuário' inválido." });
        }
        console.error("Erro ao deletar usuário: ", error);
        return res.status(500).json({ mensagem: "Erro ao excluir usuário. Por segurança, tente novamente." });
    }
}