import * as AnimalServices from "../services/animaisService.js";
import { BuscarEnderecoPorCep } from "../services/utilsService.js";

// Create
export async function criarAnimal(req, res) {
    const { nome, raca, especie, is_adotado, sobre, sexo, idade, peso, porte } = req.body;
    
    const enderecoInfo = await BuscarEnderecoPorCep(req.user.cep);
    const caminhoFoto = req.file ? req.file.path : null;

    const dados = { 
        nome,
        raca,
        especie,
        is_adotado,
        sobre,
        sexo,
        idade,
        peso,
        porte,

        caminhoFoto,
        
        responsavel: {
            responsavelId: req.user.userId,
            tipo_usuario: req.user.tipo
        },

        localizacao: {
            cidade: enderecoInfo.cidade,
            estado: enderecoInfo.estado
        }
    };

    try {
        const newAnimal = await AnimalServices.CriarAnimal(dados);
        return res.status(201).json( newAnimal );
    }
    catch(error) {
        console.error("Erro ao criar animal:", error);
        return res.status(500).json({ mensagem: "Erro ao criar animal. Por segurança, tente novamente." });
    }
}

// Read All
export async function listarAnimais(req, res) {
    try {
        const is_adotado = req.query.is_adotado;

        const animais = await AnimalServices.ListarAnimais(is_adotado);
        return res.status(200).json( animais );
    }
    catch {
        console.error("Erro ao listar animais:", error);
        return res.status(500).json({ mensagem: "Erro ao listar animais. Por segurança, tente novamente." });
    }
}

// Read All === responsavelId
export async function listarAnimaisPorResponsavel(req, res) {
    try {
        const id = req.params.id;
        const is_adotado = req.query.is_adotado;

        const animais = await AnimalServices.ListarAnimaisPorResponsavel(id, is_adotado);

        if(!animais) {
            return res.status(404).json({ mensagem: "Responsável informado não existe." });
        }

        return res.status(200).json( animais );
    }
    catch(error) {
        if(error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do responsável' inválido." });
        }
        console.error("Erro ao listar animal:", error);
        return res.status(500).json({ mensagem: "Erro ao listar animais. Por segurança, tente novamente." });
    }
}

// Read All === location
export async function listarAnimaisPorLocalizacao(req, res) {
    try {
        const { cidade, estado } = req.body;
        let termo = "";
        if(cidade) {
            termo = cidade;
        }
        else {
            termo = estado;
        }

        const is_adotado = req.query.is_adotado;

        const animais = await AnimalServices.ListarAnimaisPorLocalizacao(termo, is_adotado);

        if(!animais) {
            return res.status(404).json({ mensagem: "Responsável informado não existe." });
        }

        return res.status(200).json( animais );
    }
    catch(error) {
        if(error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do responsável' inválido." });
        }
        console.error("Erro ao listar animais:", error);
        return res.status(500).json({ mensagem: "Erro ao listar animais. Por segurança, tente novamente." });
    }
}

// Read Only one
export async function listarAnimalPorId(req, res) {
    try {
        const id = req.params.id;
        const animal = await AnimalServices.ListarAnimalPorId(id);

        if(!animal) {
            return res.status(404).json({ mensagem: "Animal não encontrado." });
        }

        return res.status(200).json( animal );
    }
    catch(error) {
        if(error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do animal' inválido." });
        }
        console.error("Erro ao listar animal:", error);
        return res.status(500).json({ mensagem: "Erro ao listar animal. Por segurança, tente novamente." });
    }
}

// Update
export async function alterarAnimal(req, res) {
    try {
        const id = req.params.id;
        const dados = req.body;

        const alterAnimal = await AnimalServices.AlterarAnimal(id, dados);

        if(!alterAnimal) {
            return res.status(404).json({ mensagem: "Animal não encontrado para alteração." });
        }

        return res.status(200).json( alterAnimal );
    }
    catch(error) {
        if(error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do animal' inválido." });
        }
        console.error("Erro ao alterar animal:", error);
        return res.status(500).json({ mensagem: "Erro ao alterar animal. Por segurança, tente novamente." });
    }
}

// Delete
export async function deletarAnimal(req, res) {
    try {
        const id = req.params.id;

        const result = await AnimalServices.DeletarAnimal(id);

        if(!result) {
            return res.status(404).json({ mensagem: "Animal não encontrado para exclusão." });
        }

        return res.status(200).json({ mensagem: "Animal excluido com sucesso." });
    }
    catch(error) {
        if(error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do animal' inválido." });
        }
        console.error("Erro ao deletar animal:", error);
        return res.status(500).json({ mensagem: "Erro ao excluir animal. Por segurança, tente novamente." });
    }
}