import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Minha API</title>
                <meta charset="UTF-8">
                <style>
                    table {
                        width: 90vw;
                        margin-bottom: 2rem;
                    }
                    th, td {
                        padding: 1rem;
                    }
                    th {
                        background-color: #079e83ff;
                        color: #fff;
                        font-size: 1.5rem;
                        font-weight: bolder;
                    }
                </style>
            </head>
            <body style="display: flex; flex-flow: column nowrap; align-items: center; min-height: 100vh; background: url('https://i.pinimg.com/736x/7b/d3/2a/7bd32a62d21938f5919c21c8539a3bd9.jpg') no-repeat center; background-size: cover;">
                
                <div id="glassEffect" style="background-color: #ffffff78; backdrop-filter: blur(8px); z-index: -999; position: fixed; top: 0; width: 100vw; height: 100vh;"></div>

                <h1 style="text-align: center; margin-top: 15vh; text-shadow: 0 0 10px #0ab88fff;">Bem-vindo(a) API do Projeto PetUp! Acesse os dados em:</h1>

                <table border="1">
                    <thead>
                        <tr style="background-color: #079e83ff; color: #fff; font-size: 1.1rem;">
                            <th>Rota</th>
                            <th>Método</th>
                            <th>Descrição</th>
                            <th>Estrutura (Entrada/Saída)</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr style="background-color: #ffdd996b;">
                            <td>/api/auth/login</td>
                            <td><strong>POST</strong></td>
                            <td>Realiza o login do usuário e retorna o Token JWT.</td>
                            <td>
                                <p><b>ENTRADA (Body):</b></p>
                                <pre>{ "email": "teste@gmail.com", "senha": "123" }</pre>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>{ "mensagem": "Login realizado com sucesso!", "token": "seu.token.jwt", "tipo_usuario": "is_tutor" }</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>/api/usuarios</td>
                            <td><strong>POST</strong></td>
                            <td>Cria um novo usuário.</td>
                            <td>
                                <p><b>ENTRADA (Body):</b></p>
                                <pre> 
                                {
                                    "nome": "Nome do Usuario",
                                    "email": "teste@gmail.com",
                                    "senha": "12345678900",
                                    "telefone": "11987654321",
                                    "cep": "01001-000",
                                    "numero": 100,
                                    "documento": "123.456.789-00",
                                    "tipo_usuario": {
                                        "is_adm": false,
                                        "is_tutor": true,
                                        "is_ong": false
                                    }
                                } </pre>
                            </td>
                        </tr>
                        <tr>
                            <td>/api/usuarios</td>
                            <td><strong>GET</strong></td>
                            <td>Lista todos os usuários, opcionalmente filtrando por ONG.</td>
                            <td>
                                <p><b>PARÂMETROS (Query Opcional):</b></p>
                                <pre>?is_ong=true/false</pre>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>
                                [ {
                                    "localizacao": {
                                        "cep": "01001000",
                                        "cidade": "São Paulo",
                                        "estado": "SP",
                                        "numero": 100
                                    },
                                    "tipo_usuario": {
                                        "is_adm": false,
                                        "is_tutor": true,
                                        "is_ong": false
                                    },
                                    "_id": "6911d286682459ae6bd97568",
                                    "nome": "Nome do Usuario",
                                    "email": "teste@gmail.com",
                                    "senha": "$2b$10$TjR8Smi5QT20F.r7D70L3.2JZ5vflmhchB0al2QKoQVHOBXRLXzSy",
                                    "telefone": "11987654321",
                                    "documento": "123.456.789-00",
                                    "criado": "2025-11-10T11:54:46.289Z",
                                    "userId": 13,
                                    "__v": 0
                                } ]
                                </pre>
                            </td>
                        </tr>

                        <tr>
                            <td>/api/usuarios/localizacao</td>
                            <td><strong>GET</strong></td>
                            <td>Lista usuários por cidade ou estado, opcionalmente filtrando por ONG.</td>
                            <td>
                                <p><b>ENTRADA (Body):</b></p>
                                <pre>{ "cidade": "São Paulo" } OU { "estado": "SP" }</pre>

                                <p><b>PARÂMETROS (Query Opcional):</b></p>
                                <pre>?is_ong=true/false</pre>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>[ { animalId: 1, responsavel: { responsavelId: 10, ... }, ... } ]</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>/api/usuarios/<i>:id</i></td>
                            <td><strong>GET</strong></td>
                            <td>Lista o usuário com o ID correspondente.</td>
                            <td>
                                <p><b>PARÂMETROS (Path):</b> ID do usuário (userId).</p>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>{ userId: 1, nome: "Usuário X", ... }</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>/api/usuarios/<i>:id</i></td>
                            <td><strong>PATCH</strong></td>
                            <td>Atualiza os dados do usuário. *Requer Token Válido.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>

                                <p><b>PARÂMETROS (Path):</b> ID do usuário (userId).</p>

                                <p><b>ENTRADA (Body - Parcial):</b></p>
                                <pre>{ "senha": "novaSenha123", "localizacao": { "cep": "01001000" } }</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>/api/usuarios/<i>:id</i></td>
                            <td><strong>DELETE</strong></td>
                            <td>Exclui um usuário pelo seu ID. *Requer Token Válido.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>

                                <p><b>PARÂMETROS (Path):</b> ID do usuário (userId).</p>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>{ "mensagem": "Usuário excluído com sucesso." }</pre>
                            </td>
                        </tr>

                        <tr style="background-color: #93ccff62;">
                            <td>/api/animais</td>
                            <td><strong>POST</strong></td>
                            <td>Cadastra um novo animal. *Requer Token Válido e form-data.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>

                                <p><b>ENTRADA (form-data/multipart):</b></p>
                                <pre>
                                    fotoAnimal: [FILE]
                                    nome: "Max"
                                    raca: "Labrador"
                                    especie: "Cachorro"
                                    is_adotado: false
                                    sobre: "Max é dócil, castrado e adora brincar com bolinhas..."
                                    sexo: "Macho"
                                    idade: 3
                                    peso: 28.5
                                    porte: "Grande"
                                </pre>
                            </td>
                        </tr>

                        <tr style="background-color: #93ccff62;">
                            <td>/api/animais</td>
                            <td><strong>GET</strong></td>
                            <td>Lista todos os animais, opcionalmente filtrando pelo status de adoção.</td>
                            <td>
                                <p><b>PARÂMETROS (Query Opcional):</b></p>
                                <pre>?is_adotado=true/false</pre>
                                
                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>
                                [ {
                                    "responsavel": {
                                        "responsavelId": 10,
                                        "cep": "01001000",
                                        "tipo_usuario": "is_tutor"
                                    },
                                    "_id": "69115f09376ca3e0380f07e8",
                                    "nome": "Max",
                                    "raca": "Labrador",
                                    "especie": "Cachorro",
                                    "is_adotado": false,
                                    "sobre": "Max é dócil, castrado e adora brincar com bolinhas...",
                                    "sexo": "Macho",
                                    "idade": 3,
                                    "peso": 28.5,
                                    "porte": "Grande",
                                    "criado": "2025-11-10T03:42:01.761Z",
                                    "animalId": 12,
                                    "__v": 0
                                } ]
                                </pre>
                            </td>
                        </tr>

                        <tr style="background-color: #93ccff62;">
                            <td>/api/animais/responsavel/<i>:id</i></td>
                            <td><strong>GET</strong></td>
                            <td>Lista todos os animais cadastrados por um responsável (userId), opcionalmente filtrando pelo status de adoção.</td>
                            <td>
                                <p><b>PARÂMETROS (Path):</b> ID do responsável (userId).</p>

                                <p><b>PARÂMETROS (Query Opcional):</b></p>
                                <pre>?is_adotado=true/false</pre>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>[ { animalId: 1, responsavel: { responsavelId: 10, ... }, ... } ]</pre>
                            </td>
                        </tr>

                        <tr style="background-color: #93ccff62;">
                            <td>/api/animais/localizacao</td>
                            <td><strong>GET</strong></td>
                            <td>Lista animais por cidade ou estado, opcionalmente filtrando pelo status de adoção.</td>
                            <td>
                                <p><b>ENTRADA (Body):</b></p>
                                <pre>{ "cidade": "São Paulo" } OU { "estado": "SP" }</pre>
                                
                                <p><b>PARÂMETROS (Query Opcional):</b></p>
                                <pre>&is_adotado=true/false</pre>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>[ { animalId: 1, responsavel: { responsavelId: 10, ... }, ... } ]</pre>
                            </td>
                        </tr>

                        <tr style="background-color: #93ccff62;">
                            <td>/api/animais/<i>:id</i></td>
                            <td><strong>PATCH</strong></td>
                            <td>Atualiza dados de um animal. *Requer Token Válido.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>
                                
                                <p><b>PARÂMETROS (Path):</b> ID do animal (animalId).</p>

                                <p><b>ENTRADA (Body - Parcial):</b></p>
                                <pre>{ "nome": "Novo Nome", "is_adotado": true }</pre>
                            </td>
                        </tr>

                        <tr style="background-color: #93ccff62;">
                            <td>/api/animais/<i>:id</i></td>
                            <td><strong>DELETE</strong></td>
                            <td>Exclui um animal pelo seu ID. *Requer Token Válido.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>
                                
                                <p><b>PARÂMETROS (Path):</b> ID do animal (animalId).</p>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>{ "mensagem": "Animal excluído com sucesso." }</pre>
                            </td>
                        </tr>

                        <tr style="background-color: #a1ff9362;">
                            <td>/api/adocoes</td>
                            <td><strong>POST</strong></td>
                            <td>Insere uma nova adoção. *Requer Token Válido.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>

                                <p><b>ENTRADA (Body):</b></p>
                                <pre> 
                                {
                                    "animalId": 21,
                                    "telefone": "125643265445",
                                    "descricao_lar": "É uma casa daora.",
                                    "possui_outro_animal": "true",
                                    "porque_deseja_adotar": "Minha filha tá enxendo o saco."
                                } 
                                </pre>
                            </td>
                        </tr>
                        <tr style="background-color: #a1ff9362;">
                            <td>/api/adocoes</td>
                            <td><strong>GET</strong></td>
                            <td>Lista todos as adoções feitas.</td>
                            <td>
                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>
                                [ {
                                    "_id": "6915d5410baad57179c0fed4",
                                    "animalId": 21,
                                    "userId": 13,
                                    "telefone": "125643265445",
                                    "estado": "MG",
                                    "cidade": "Aguanil",
                                    "descricao_lar": "É uma casa daora.",
                                    "possui_outro_animal": true,
                                    "porque_deseja_adotar": "Minha filha tá enxendo o saco.",
                                    "criado": "2025-11-13T12:55:29.356Z",
                                    "formularioId": 2,
                                    "__v": 0
                                } ]
                                </pre>
                            </td>
                        </tr>

                        <tr style="background-color: #a1ff9362;">
                            <td>/api/adocoes/localizacao</td>
                            <td><strong>GET</strong></td>
                            <td>Lista as adoções por cidade ou estado.</td>
                            <td>
                                <p><b>ENTRADA (Body):</b></p>
                                <pre>{ "cidade": "São Paulo" } OU { "estado": "SP" }</pre>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>[ { animalId: 1, userId: 12, ... } ]</pre>
                            </td>
                        </tr>

                        <tr style="background-color: #a1ff9362;">
                            <td>/api/adocoes/<i>:id</i></td>
                            <td><strong>GET</strong></td>
                            <td>Lista a adoção com o ID correspondente.</td>
                            <td>
                                <p><b>PARÂMETROS (Path):</b> ID da adoção (formularioId).</p>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>{ animalId: 1, userId: 12, ... }</pre>
                            </td>
                        </tr>

                        <tr style="background-color: #a1ff9362;">
                            <td>/api/adocoes/<i>:id</i></td>
                            <td><strong>PATCH</strong></td>
                            <td>Atualiza os dados da adoção. *Requer Token Válido.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>

                                <p><b>PARÂMETROS (Path):</b> ID da adoção (formularioId).</p>

                                <p><b>ENTRADA (Body - Parcial):</b></p>
                                <pre>{ "senha": "novaSenha123", "localizacao": { "cep": "01001000" } }</pre>
                            </td>
                        </tr>
                        
                        <tr style="background-color: #a1ff9362;">
                            <td>/api/adocoes/<i>:id</i></td>
                            <td><strong>DELETE</strong></td>
                            <td>Exclui uma adoção pelo seu ID. *Requer Token Válido.*</td>
                            <td>
                                <p><b>AUTHORIZATION (Header):</b></p>
                                <pre>{ "Authorization": "Bearer seu.token.jwt" }</pre>

                                <p><b>PARÂMETROS (Path):</b> ID da adoção (formularioId).</p>

                                <p><b>SAÍDA (Sucesso 200):</b></p>
                                <pre>{ "mensagem": "Formulário excluído com sucesso." }</pre>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </body>
        </html>
    `)
});

export default router;