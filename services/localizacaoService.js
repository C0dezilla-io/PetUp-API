import axios from 'axios';

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