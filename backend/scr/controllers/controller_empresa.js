const empresaModel = require('../models/model_empresa');

async function empresaCadastro(req, res){
    const result = await empresaModel.insereNovaEmpresa(req.body.nome, req.body.documento, req.body.email, req.body.senha);
     return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    empresaCadastro,
  };