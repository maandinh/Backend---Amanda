// 1. Importar o freamework
const express = require("express");

//middleware de roteamento
const router =  express.Router();

router.get('/', (req, res) => {
    res.send("Listar as tarefas");
});

router.post('/',(req, res) => {
    res.status(201).send("Tarefas criadas com sucesso");
});

router.put('/:id',(req, res) => {
    const { id } = req.params; //desestruturando o objeto params
    if (id == 1) return res.send("Tarefas atualizada");
    res.status(404).send("Tarefa nao encontrada");
});

router.delete('/:id',(req, res) => {
    const { id } = req.params; //desestruturando o objeto params
    if (id == 1) return res.status(204).end(); //sem conteúdo
    throw Error("Tarefa nao encontrada");
});

module.exports = router;