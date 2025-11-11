import mongoose, { Schema } from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

export const formularioAdocaoSchema = new Schema({
    formularioId: { type: Number, unique: true },

    telefone: { type: String, required: true },
    estado: { type: String, required: true },
    cidade: { type: String, required: true },
    descricao_lar: { type: String, required: true },
    possui_outro_animal: { type: Boolean, required: true },
    porque_deseja_adotar: { type: String, required: true },

    criado: { type: Date, default: Date.now }
});

// Plugin para autoincrementar o ID
formularioAdocaoSchema.plugin(AutoIncrement, {
    id: "formularioAdocao-counter",
    inc_field: "formularioId"
});

export const FormularioAdocao = mongoose.model("FormularioAdocao", formularioAdocaoSchema, "formularios_adocao");
