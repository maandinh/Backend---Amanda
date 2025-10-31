require('dotenv').config();
const express = require('express');
const app = express();
const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

app.use(express.json());


app.use('/produtos', produtosRouter);
app.use('/usuarios', usuariosRouter);


module.exports = app;
