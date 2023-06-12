
async function login( email, senha){
    const client = require('../configs/db.configs');
    var db = client.db(process.env.DB_NAME);
    
    const query = { "email": email };
    const result = await db.collection('users').find(query).toArray();
    if (result === undefined || result.length ==0){
      

      return {ok: false,
              err_msg: 'Usuário não encontrado'}
    }
    if (senha == result[0].senha){
      return {ok: true,
        user: result[0]}
    }
    else{
      return {ok: false,
        err_msg: 'Senha não corresponde'}
    }

    
}


module.exports = {
  login,
}