const express = require('express');
const app = express();

app.use(express.json());

const apidocsRouter = require('./routes/apidocsRouter');
const produtosRouter = require('./routes/produtosRouter');

app.use('/api-docs', apidocsRouter);
app.use('/produtos', produtosRouter);

module.exports = app;