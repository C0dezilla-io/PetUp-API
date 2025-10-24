const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const rootRouter = require("./routes/root.js");
app.use("/", rootRouter);

app.listen(port, () => {
    console.log("Servidor rodando em 127.0.0.1:" + port);
});