const { cifrarSenha, compararSenha, gerarToken } = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');

async function criar(req, res) {
    try {
        const { email, senha } = req.body;
        const senhaCifrada = cifrarSenha(senha);

        const novoUsuario = await usuariosModel.create({
            email,
            senha: senhaCifrada
        });

        return res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });

    } catch (err) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

async function entrar(req, res) {
    try {
        const { usuario, senha } = req.body;
        const usuarioEncontrado = await usuariosModel.findOne({ email: usuario });

        if (!usuarioEncontrado) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const confere = compararSenha(senha, usuarioEncontrado.senha);

        if (!confere) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const token = gerarToken({ email: usuario });

        return res.status(200).json({ token });

    } catch (err) {
        return res.status(500).json({ msg: "Erro interno" });
    }
}

async function renovar(req, res) {
    try {
        const token = gerarToken({ email: req.usuario });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido" });
    }
}

async function remover(req, res) {
    try {
        await usuariosModel.findOneAndDelete({ _id: req.params.id });
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ msg: "Erro ao remover usuário" });
    }
}


module.exports = { criar, entrar, renovar, remover };
