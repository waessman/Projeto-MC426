const userModel = require('../models/model_usuarios');

async function GetUser(req, res){
    console.log(req.userInfo);
    const result = await userModel.user_by_id(req.userInfo);
    return res.status(200).json(result);
}

async function editUser(req, res){
    const result = await userModel.edit_user(req.userInfo, req.body.nome, req.body.documento, req.body.senha);
    return res.status(200).json(result);
}

module.exports = {
    GetUser,
    editUser
}
