const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true, 
        minLength: 3, 
    },
    preco: {
        type: Number,
        required: true
      }
});

module.exports = mongoose.model('Produto', schema);