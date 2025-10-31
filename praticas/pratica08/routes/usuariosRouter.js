const express = require('express');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (email && senha === 'abcd1234') {
    const token = gerarToken({ email });
    return res.status(200).json({ token });
  }
  return res.status(401).json({ msg: "Usuário ou senha inválidos" });
});

router.post('/renovar', verificarToken, (req, res) => {
  const token = gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});

module.exports = router;
