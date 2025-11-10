import { Animal } from "../models/animalSchema.js";

// Create
export async function CriarAnimal( dados ) {
    const newAnimal = new Animal(dados);
    return await newAnimal.save();
}

// Read All
export async function ListarAnimais(is_adotado = null) {
    const filtro = {};

    if(is_adotado !== null && is_adotado !== undefined) {
        const status = (is_adotado === "true");
        filtro.is_adotado = status;
    }

    return await Animal.find(filtro);
}

// Read All === responsavelId
export async function ListarAnimaisPorResponsavel(id, is_adotado = null) {
    const filtro = {
        "responsavel.responsavelId": Number(id)
    };

    if(is_adotado !== null && is_adotado !== undefined) {
        const status = (is_adotado === "true");
        filtro.is_adotado = status;
    }

    return await Animal.find(filtro);
}

// Read All === location
export async function ListarAnimaisPorLocalizacao(termo, is_adotado = null) {
    const termoInsensitivo = new RegExp(termo, 'i');
    const orQuery = {
        $or: [
            { "localizacao.cidade": termoInsensitivo },
            { "localizacao.estado": termoInsensitivo }
        ]
    };
    const filtro = [orQuery];

    if(is_adotado !== null && is_adotado !== undefined) {
        const status = (is_adotado === "true");
        filtro.push ({ is_adotado: status });
    }

    return await Animal.find({ $and: filtro });
}

// Read Only one
export async function ListarAnimalPorId(id) {
    return await Animal.findOne({ animalId: Number(id) });
}

// Update
export async function AlterarAnimal(id, dados) {
    return await Animal.findOneAndUpdate(
        { animalId: Number(id) },
        { $set: dados },
        { new: true }
    );
}

// Delete
export async function DeletarAnimal(id) {
    return await Animal.findOneAndDelete({ animalId: Number(id) });
}