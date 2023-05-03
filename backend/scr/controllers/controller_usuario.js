const usuarioModel = require('../models/model_usuario');

async function usuarioCadastro(req, res){
    const result = await usuarioModel.insereNovoUsuario(req.body.nome, req.body.documento, req.body.email, req.body.senha);
     return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    usuarioCadastro,
  };