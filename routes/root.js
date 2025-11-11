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
                <table border="1" style="margin-top: 20px;">

                
                    <tr>
                        <th>Rota</th>
                        <th>Método</th>
                        <th>Descrição</th>
                        <th>Estrutura</th>
                    </tr>
                
                    <tr style="background-color: #f0f0f0;">
                        <td>/api/auth/login</td>
                        <td><strong>POST</strong></td>
                        <td>Realiza o login do usuário e retorna o Token JWT.</td>
                        <td>
                            <p><b>ENTRADA (Body):</b></p>
                            <pre>{ "email": "teste@gmail.com", "senha": "123" }</pre>
                            <p><b>SAÍDA (Sucesso 200):</b></p>
                            <pre>{ "mensagem": "Login realizado com sucesso!", "token": "seu.token.jwt", "permissao": "is_tutor" }</pre>
                        </td>
                    </tr>
                    <tr>
            <td>/api/usuarios</td>
            <td><strong>POST</strong></td>
            <td>Cria um novo usuário.</td>
            <td>
                <p><b>ENTRADA (Body):</b></p>
                <pre>
                    { "nome": "Novo Nome", "email": "a@a.com", "senha": "123", "telefone": "11987654321", "cep": "01001-000", "numero": 100, "documento": "123.456.789-00", "tipo_usuario": { "is_adm": false, "is_tutor": true, "is_ong": false }}
                </pre>
            </td>
        </tr>
                    <tr>
                        <td>/api/usuarios</td>
                        <td><strong>POST</strong></td>
                        <td>Insere um usuário no banco de dados.</td>
                        <td>
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
                            }
                        </td>
                    </tr>

                    <tr>
                        <td>/api/usuarios</td>
                        <td><strong>GET</strong></td>
                        <td>Lista todos os usuários do banco de dados.</td>
                        <td>
                            {
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
                            }
                        </td>
                    </tr>

                    <tr>
                        <td>/api/usuarios/<i>:id</i></td>
                        <td><strong>GET</strong></td>
                        <td>Lista o usuário com o id correspondente.</td>
                        <td>
                            {
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
                            }
                        </td>
                    </tr>

                    <tr>
                        <td>/api/usuarios/<i>:id</i></td>
                        <td><strong>PATCH</strong></td>
                        <td>Atualiza o usuário com o id correspondente.</td>
                        <td>
                            {
                                "tipo_usuario": {
                                    "is_adm": false,
                                    "is_tutor": true,
                                    "is_ong": false
                                }
                            }
                        </td>
                    </tr>

                    <tr>
                        <td>/api/usuarios/<i>:id</i></td>
                        <td><strong>DELETE</strong></td>
                        <td>Deleta o usuário com o id correspondente.</td>
                        <td>
                            {
                                "mensagem": "Usuário excluido com sucesso."
                                }
                            }
                        </td>
                    </tr>

                    

                </table>
            </body>
        </html>
    `)
});

export default router;