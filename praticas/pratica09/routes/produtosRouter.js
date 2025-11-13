const express = require('express');
const router = express.Router();

let produtos = [];
let nextId = 1; 

router.get('/', (req, res) => {
  return res.status(200).json(produtos);
});

router.post('/', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(422).json({ message: 'Nome e preço são obrigatórios' });
  }
  const produto = { id: nextId++, nome, preco };
  produtos.push(produto);
  return res.status(201).json(produto);
});


router.get('/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId, 10);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  return res.status(200).json(produto);
});


router.put('/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId, 10);
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(422).json({ message: 'Nome e preço são obrigatórios' });
  }
  const idx = produtos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  produtos[idx] = { id, nome, preco };
  return res.status(200).json(produtos[idx]);
});


router.delete('/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId, 10);
  const idx = produtos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  produtos.splice(idx, 1);
  return res.status(204).send();
});

module.exports = router;
