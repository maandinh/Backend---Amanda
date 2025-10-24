const mongoose = require('mongoose');
const Produto = require('../models/produtosModel.js');

async function criar(req, res) {
    try {
      const novoProduto = await Produto.create({
        nome: req.body.nome,
        preco: req.body.preco
      });
  
      return res.status(201).json({
        _id: novoProduto._id,
        nome: novoProduto.nome,
        preco: novoProduto.preco
      });
    } catch (err) {
        if (err.errors) {
            return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
        }
    }
}

  async function listar(req, res) {
    const produtos = await Produto.find({});
    return res.status(200).json(produtos);
  };

  async function buscar(req, res, next) {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Parâmetro inválido" });
    }
  
    const produtoEncontrado = await Produto.findOne({ _id: id });
  
    if (produtoEncontrado) {
      req.produto = {
        _id: produtoEncontrado._id,
        nome: produtoEncontrado.nome,
        preco: produtoEncontrado.preco
      };
      return next();
    }
  
    return res.status(404).json({ msg: "Produto não encontrado" });
  }

  function exibir(req, res) {
    return res.status(200).json(req.produto);
  }

  async function atualizar(req, res) {
    const { id } = req.params;
    const { nome, preco } = req.body;
  
    if (!nome || !preco) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
  
    try {
      const produtoAtualizado = await Produto.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true, runValidators: true }
      );
  
      if (!produtoAtualizado) {
        return res.status(404).json({ msg: "Produto não encontrado" });
      }
  
      return res.status(200).json({
        id: produtoAtualizado._id,
        nome: produtoAtualizado.nome,
        preco: produtoAtualizado.preco
      });
    } catch (err) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
  }
  
  async function remover(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Parâmetro inválido" });
    }

    const produtoRemovido = await Produto.findOneAndDelete({ _id: id });
  
    if (!produtoRemovido) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }
    return res.status(204).end();
  }
  
  module.exports = { criar, buscar, listar, exibir, atualizar, remover}


  
  