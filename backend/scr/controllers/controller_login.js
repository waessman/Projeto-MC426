const loginModel = require('../models/model_login');

async function Login(req, res){
    
    const result = await loginModel.login(req.body.email, req.body.senha);
    return res.status(200).json(result);
    
    
}

module.exports = {
    Login,
  };