import * as FormularioServices from "../services/formulariosService.js";
import { BuscarEnderecoPorCep } from "../services/utilsService.js";

// === CREATE ===
export async function criarFormulario(req, res) {
    try {
        const { animalId, telefone, descricao_lar, possui_outro_animal, porque_deseja_adotar } = req.body;
        const enderecoInfo = await BuscarEnderecoPorCep(req.user.cep);

        const dados = {
            animalId,
            userId: req.user.userId,
            telefone,
            estado: enderecoInfo.estado,
            cidade: enderecoInfo.cidade,
            descricao_lar,
            possui_outro_animal: (possui_outro_animal === "true"),
            porque_deseja_adotar
        };

        const novoFormulario = await FormularioServices.CriarFormulario(dados);
        return res.status(201).json(novoFormulario);
    }
    catch (error) {
        console.error("Erro ao criar formulário:", error);
        return res.status(500).json({ mensagem: "Erro ao criar formulário. Por segurança, tente novamente." });
    }
}

// === READ ALL ===
export async function listarFormularios(req, res) {
    try {
        const formularios = await FormularioServices.ListarFormularios();
        return res.status(200).json(formularios);
    }
    catch (error) {
        console.error("Erro ao listar formulários:", error);
        return res.status(500).json({ mensagem: "Erro ao listar formulários. Por segurança, tente novamente." });
    }
}

// === READ BY ID ===
export async function listarFormularioPorId(req, res) {
    try {
        const id = req.params.id;
        const formulario = await FormularioServices.ListarFormularioPorId(id);

        if (!formulario) {
            return res.status(404).json({ mensagem: "Formulário não encontrado." });
        }

        return res.status(200).json(formulario);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do formulário' inválido." });
        }
        console.error("Erro ao listar formulário:", error);
        return res.status(500).json({ mensagem: "Erro ao listar formulário. Por segurança, tente novamente." });
    }
}

// === READ BY LOCALIZAÇÃO ===
export async function listarFormulariosPorLocalizacao(req, res) {
    try {
        const { cidade, estado } = req.body;
        let termo = "";

        if (cidade) {
            termo = cidade;
        } else if (estado) {
            termo = estado;
        } else {
            return res.status(400).json({ mensagem: "Informe cidade ou estado para a busca." });
        }

        const formularios = await FormularioServices.ListarFormulariosPorLocalizacao(termo);

        if (!formularios || formularios.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum formulário encontrado para essa localização." });
        }

        return res.status(200).json(formularios);
    }
    catch (error) {
        console.error("Erro ao listar formulários por localização:", error);
        return res.status(500).json({ mensagem: "Erro ao listar formulários. Por segurança, tente novamente." });
    }
}

// === UPDATE ===
export async function alterarFormulario(req, res) {
    try {
        const id = req.params.id;
        const dados = req.body;

        const formAtualizado = await FormularioServices.AlterarFormulario(id, dados);

        if (!formAtualizado) {
            return res.status(404).json({ mensagem: "Formulário não encontrado para alteração." });
        }

        return res.status(200).json(formAtualizado);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do formulário' inválido." });
        }
        console.error("Erro ao alterar formulário:", error);
        return res.status(500).json({ mensagem: "Erro ao alterar formulário. Por segurança, tente novamente." });
    }
}

// === DELETE ===
export async function deletarFormulario(req, res) {
    try {
        const id = req.params.id;
        const result = await FormularioServices.DeletarFormulario(id);

        if (!result) {
            return res.status(404).json({ mensagem: "Formulário não encontrado para exclusão." });
        }

        return res.status(200).json({ mensagem: "Formulário excluído com sucesso." });
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ mensagem: "Parâmetro 'Id do formulário' inválido." });
        }
        console.error("Erro ao deletar formulário:", error);
        return res.status(500).json({ mensagem: "Erro ao excluir formulário. Por segurança, tente novamente." });
    }
}
