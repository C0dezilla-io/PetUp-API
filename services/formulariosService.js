import { FormularioAdocao } from "../models/formularioAdocaoSchema.js";

// === CREATE ===
export async function CriarFormulario(dados) {
  const novoFormulario = new FormularioAdocao(dados);
  return await novoFormulario.save();
}

// === READ ALL ===
export async function ListarFormularios() {
  return await FormularioAdocao.find();
}

// === READ BY ID ===
export async function ListarFormularioPorId(id) {
  return await FormularioAdocao.findOne({ formularioId: Number(id) });
}

// === READ BY CIDADE/ESTADO ===
export async function ListarFormulariosPorLocalizacao(termo) {
  const termoInsensitivo = new RegExp(termo, "i");
  const filtro = {
    $or: [{ cidade: termoInsensitivo }, { estado: termoInsensitivo }],
  };
  return await FormularioAdocao.find(filtro);
}

// === READ BY ANIMAL ID ===
export async function ListarFormulariosPorAnimal(id) {
  return await FormularioAdocao.find({ animalId: Number(id) });
}

// === UPDATE ===
export async function AlterarFormulario(id, dados) {
  return await FormularioAdocao.findOneAndUpdate(
    { formularioId: Number(id) },
    { $set: dados },
    { new: true }
  );
}

// === DELETE ===
export async function DeletarFormulario(id) {
  return await FormularioAdocao.findOneAndDelete({ formularioId: Number(id) });
}
