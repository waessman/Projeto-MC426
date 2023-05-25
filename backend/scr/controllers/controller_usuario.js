const usuarioModel = require('../models/model_usuario');

async function usuarioCadastro(req, res) {
    const result = await usuarioModel.insereNovoUsuario(req.body.nome, req.body.documento, req.body.email, req.body.senha);
    if (!result.ok) {
        return res.status(500).json({
            ok: false,
            error: result.message ? result.message : ''
        })
    }

    return res.status(200).json({
        ok: true,
        message: result.message ? result.message : ''
    });
}

module.exports = {
    usuarioCadastro,
};