const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, (req, res) => {
  res.json([]); 
});

module.exports = router;
