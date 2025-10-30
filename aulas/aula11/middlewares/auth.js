const jwt = require('jsonwebtoken');

function gerarToken(payload) {
    try {
        const token = jwt.sign(payload,process.env.JWT_SEGREDO, { expiresIn });
        return token;
    } catch(err) {
        throw Error("Erro ao gerar um token");
    } 
}

function verificarToken(req, res, next) {
    try {
        const {authoeization } = req.headers;
        const payload = jwt.verify(authorization, process.env.JWT_SEGREDO);
        req.payload = payload;
        return next();
    } catch (err) {
        return res.status(400).json({ msg: "Token invalido"})
    }
}

module.exports = { gerarToken, verificarToken };
