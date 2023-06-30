const mensagens = require('../helpers/messages');

async function insereNovoUsuario(nome, documento, email, senha, confirmarSenha, tipo){
    const client = require('../configs/db.configs');
    const { validaEmail, verificaEmailDuplicado } = require('../validation/validations');

    var db = client.db(process.env.DB_NAME);

    if(!validaEmail(email)){
      return {ok: false, err_msg: mensagens.emailInvalid}
    }
  
    if(await verificaEmailDuplicado(email)){
      return {ok: false, err_msg: mensagens.emailAlreadyUsed}
    }
  
    if(senha != confirmarSenha){
      return {ok: false, err_msg: mensagens.passwordsNotMatch}
    }
    const novoUsuario = { email: email, nome: nome, documento: documento, senha: senha, tipo: tipo};
    if(tipo == 2 ){
      novoUsuario.curriculo = "";
    }
    await db.collection('users').insertOne(novoUsuario, function (err, result) {
    }).catch((err) => {
      console.log(err);
      return {ok: false, err_msg: mensagens.genericError}
    });
    return {ok: true}
    
}


module.exports = {
  insereNovoUsuario,
}
