import mongoose, { Schema} from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

export const usuarioSchema = new Schema ({
    userId: { type: Number, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    cep: { type: String, required: true },
    numero: { type: Number, required: true },
    documento: { type: String, required: true },
    tipo_usuario: {
        is_adm: { type: Boolean, default: false },
        is_tutor: { type: Boolean, default: false },
        is_ong: { type: Boolean, default: false }
    },
    criado: { type: Date, default: Date.now }
});

usuarioSchema.plugin(AutoIncrement, {
    id: "user-counter",
    inc_field: "userId"
});

export const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");