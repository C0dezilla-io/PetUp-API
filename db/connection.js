import mongoose from "mongoose";
import 'dotenv/config';

export function connectDB() {

    mongoose.connection.on("open", () => {
        console.log("Conectado com sucesso ao MongoDB");
    });

    const connection = mongoose.connect(process.env.URI_BANCO);

    return connection;
}