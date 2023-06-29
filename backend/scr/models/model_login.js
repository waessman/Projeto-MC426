const client = require('../configs/db.configs');
var db = client.db(process.env.DB_NAME);

async function login( email, senha){
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

async function get_usertype( email){
  
  const query = { "email": email };
  const result = await db.collection('users').find(query).toArray();
  if (result === undefined || result.length ==0){
    return {ok: false,
            err_msg: 'Usuário não encontrado'}
  }
  else{
    return {ok: true,
      tipo: result[0].tipo}
  } 
}

module.exports = {
  login,
  get_usertype,
}