const empresaModel = require('../models/model_empresa');

async function empresaCadastro(req, res){
    console.log(req.body);

    const result = await empresaModel.insereNovaEmpresa(req.body.nome, req.body.documento,
         req.body.email, req.body.senha, req.body.confirmarSenha);
    if (result == true) {
        return res.status(200).json({
            ok: true,
        });
    }
    else
    {
        return res.status(200).json({
            ok: false,
            err_msg: result,
        });
    }
    
}

module.exports = {
    empresaCadastro,
  };