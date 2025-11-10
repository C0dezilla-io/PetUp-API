import multer from "multer";
import axios from "axios";

export async function BuscarEnderecoPorCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await axios.get(url);
        
        if (response.data.erro) {
            return { cidade: null, estado: null, erro: "CEP não encontrado." };
        }
        
        return {
            cidade: response.data.localidade,
            estado: response.data.uf 
        };
        
    } catch (error) {
        console.error("Erro ao consultar ViaCEP:", error.message);
        return { cidade: null, estado: null, erro: "Falha na comunicação com o serviço de CEP." };
    }
}


// Configuração do armazenamento: Onde e como salvar o arquivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/animais"); // Pasta onde a imagem será salva
    },
    filename: (req, file, cb) => {
        // Cria um nome de arquivo único para evitar colisões
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        // Salva com o nome original + timestamp
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    }
});

// Middleware final configurado
export const uploadAnimal = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite o tamanho do arquivo (ex: 5MB)
}).single("fotoAnimal"); // Use .single() e defina o nome do campo no formulário (ex: "fotoAnimal"