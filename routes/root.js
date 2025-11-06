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
                    </tr>

                </table>
            </body>
        </html>
    `)
});

export default router;