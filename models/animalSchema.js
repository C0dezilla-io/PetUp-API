import mongoose, { Schema } from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

export const animalSchema = new Schema({
    animalId: { type: Number, unique: true },
    nome: { type: String, required: false },
    raca: { type: String, required: false },
    especie: { type: String, required: true },
    is_adotado: { type: Boolean, default: false },
    sobre: { type: String, required: false },
    sexo: { type: String, required: true },
    idade: { type: Number, required: true },
    peso: { type: Number, required: false },
    porte: { type: String, required: true },
    caminhoFoto: { type: String, required: false },
    responsavel: {
        responsavelId: Number,
        nome: String,
        tipo_usuario: String
    },
    localizacao: {
        cidade: { type: String, required: true },
        estado: { type: String, required: true },
    },
    criado: { type: Date, default: Date.now }
});

animalSchema.plugin(AutoIncrement, {
  id: "animal-counter",
  inc_field: "animalId",
});

export const Animal = mongoose.model("Animal", animalSchema, "animais");
