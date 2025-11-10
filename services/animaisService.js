import { Animal } from "../models/animalSchema.js";

// Create
export async function CriarAnimal( dados ) {
    const newAnimal = new Animal(dados);
    return await newAnimal.save();
}

// Read All
export async function ListarAnimais() {
    return await Animal.find({});
}

// Read All === responsavelId
export async function ListarAnimaisPorResponsavel(id) {
    return await Animal.find({ "responsavel.responsavelId": id });
}

// Read All === location
export async function ListarAnimaisPorLocalizacao(termo) {
    return await Animal.find({
        $or: [
            { "localizacao.cidade": termo },
            { "localizacao.estado": termo }
        ]
    });
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