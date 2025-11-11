import { Usuario } from "../models/usuarioSchema.js";

// Create
export async function CriarUsuario( dados ) {
    const newUsuario = new Usuario(dados);
    return await newUsuario.save();
}

// Read All
export async function ListarUsuarios(is_ong = null) {
    let filtro = {};

    if(is_ong !== null && is_ong !== undefined) {
        const status = (is_ong === "true");
        filtro = { "tipo_usuario.is_ong": status };
    }

    return await Usuario.find(filtro);
}

// Read All === location
export async function ListarUsuariosPorLocalizacao(termo, is_ong = null) {
    const termoInsensitivo = new RegExp(termo, 'i');
    const orQuery = {
        $or: [
            { "localizacao.cidade": termoInsensitivo },
            { "localizacao.estado": termoInsensitivo }
        ]
    };
    const filtro = [orQuery];

    if(is_ong !== null && is_ong !== undefined) {
        const status = (is_ong === "true");
        filtro.push ({ "tipo_usuario.is_ong": status });
    }

    return await Usuario.find({ $and: filtro });
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