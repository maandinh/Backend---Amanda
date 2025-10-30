const express = require('express');
const { gerarToken } = require("../middlewares/auth");

const router = express.Router();

router.post('/login', function(req, res, next) { 
  const { username, password } = req.body;

  // simular uma autenticacao
  if(username === 'amanda.soares2@iesb.edu.br' && password === 'abcd1234') {
    const payload = {
      iss: "Minha API",
      email: username,
      nome: "Amanda",
      perfil: "admin"
    }
    try{
    return res.json({token: gerarToken(payload)});
  } catch(err) {
    return res.status(500).json({ msg: err.message });
  }}
  return res.status(401).json({msg: "Credenciais invalidas"});
});

module.exports = router;
