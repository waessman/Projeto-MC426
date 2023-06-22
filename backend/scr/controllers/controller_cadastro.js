const modelo = require('../models/model_cadastro');

async function empresaCadastro(req, res){

    const result = await modelo.insereNovoUsuario(req.body.nome, req.body.documento,
         req.body.email, req.body.senha, req.body.confirmarSenha, 1);
    if(result.ok){
        return res.status(201).json(result); 
    }
    else{
        return res.status(404).json(result); 
    }
          
}

async function usuarioCadastro(req, res){

    const result = await modelo.insereNovoUsuario(req.body.nome, req.body.documento,
         req.body.email, req.body.senha, req.body.confirmarSenha, 2);
    
    if(result.ok){
        return res.status(201).json(result); 
    }
    else{
        return res.status(404).json(result); 
    }
                
}

module.exports = {
    empresaCadastro,
    usuarioCadastro
  };
