// 1. Importar o freamework
    const express = require("express");

// 2. Criar uma instância da aplicação
    const app = express();

//Criar um middleware
app.get('/', (req, res) => {
    res.send("Olá");
});

// 3. Iniciar a aplicação em uma porta
    app.listen(8000, ()=>{
        console.log("App está On!");
    });