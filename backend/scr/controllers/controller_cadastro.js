const modelo = require('../models/model_cadastro');

async function empresaCadastro(req, res){

    const result = await modelo.insereNovoUsuario(req.body.nome, req.body.documento,
         req.body.email, req.body.senha, req.body.confirmarSenha, 1);
    
    return res.status(200).json(result);       
}

async function usuarioCadastro(req, res){

    const result = await modelo.insereNovoUsuario(req.body.nome, req.body.documento,
         req.body.email, req.body.senha, req.body.confirmarSenha, 2);
    
    return res.status(200).json(result);       
}

module.exports = {
    empresaCadastro,
    usuarioCadastro
  };
