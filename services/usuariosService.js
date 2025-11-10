import { Usuario } from "../models/usuarioSchema.js";

// Create
export async function CriarUsuario( dados ) {
    const newUsuario = new Usuario(dados);
    return await newUsuario.save();
}

// Read All
export async function ListarUsuarios() {
    return await Usuario.find({});
}

// Read Only one
export async function ListarUsuarioPorId(id) {
    return await Usuario.findOne({ userId: Number(id) });
}

// Update
export async function AlterarUsuario(id, dados) {
    return await Usuario.findOneAndUpdate(
        { userId: Number(id) },
        { $set : dados },
        { new : true }
    );
}

// Delete
export async function DeletarUsuario(id) {
    return await Usuario.findOneAndDelete({ userId: Number(id) });
}