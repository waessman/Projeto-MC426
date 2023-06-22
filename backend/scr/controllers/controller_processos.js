const processoModel = require('../models/model_processos');
const loginModel = require('../models/model_login');

async function Criar_processo(req, res){
    const result_tipo = await loginModel.get_usertype(req.userInfo);
    if(result_tipo.ok){
        if(result_tipo.tipo == 1){
            const result = await processoModel.criar(req.body.nome, req.body.descricao, req.body.link_externo, req.body.requisitos, req.body.local, req.body.contato, req.userInfo);
            return res.status(200).json(result);}
        else{
            return res.status(404).json({ok: false, err_msg: "Usuário não tem permissão."});
        }
    }
    else{
        return res.status(200).json(result_tipo);
    }
}

async function Deletar_processo(req, res){
    const result_tipo = await loginModel.get_usertype(req.userInfo);
    if(result_tipo.ok){
        if(result_tipo.tipo == 1){
            const result = await processoModel.deletar(req.body.id, req.userInfo);
            return res.status(200).json(result);}
        else{
            return res.status(404).json({ok: false, err_msg: "Usuário não tem permissão."});
        }
    }
    else{
        return res.status(200).json(result_tipo);
    }
}

async function Get_proc_empresa(req, res){
    const result_tipo = await loginModel.get_usertype(req.userInfo);
    if(result_tipo.ok){
        if(result_tipo.tipo == 1){
            const result = await processoModel.todos_processos_empresa(req.userInfo);
            console.log(result);
            return res.status(200).json(result);
        }
        else{
            return res.status(404).json({ok: false, err_msg: "Usuário não tem permissão."});
        }  
    }
    else{
        return res.status(200).json(result_tipo);
    }
}

module.exports = {
    Criar_processo,
    Deletar_processo,
    Get_proc_empresa,
  };

