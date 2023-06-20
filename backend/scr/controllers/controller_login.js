const loginModel = require('../models/model_login');
const createJWT = require('../middlewares/jwt.middleware').createJWT;

async function Login(req, res){
    
    const result = await loginModel.login(req.body.email, req.body.senha);
    if (result.ok){
        const token = await createJWT(result.user.email);
        return res.status(200).json({ok: true,
            token: token, tipo: result.user.tipo});
    }
    return res.status(200).json(result);
    
    
}

module.exports = {
    Login,
  };