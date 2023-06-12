
async function insereNovoUsuario(nome, documento, email, senha, confirmarSenha) {
  const client = require('../configs/db.configs');

  const { validaEmail, verificaEmailDuplicado } = require('../validation/validations');

  if(!validaEmail(email)){
    return {ok: false, message: "E-mail inválido"}
  }

  if(await verificaEmailDuplicado(email)){
    return {ok: false, message: "E-mail já cadastrado"}
  }

  if(senha != confirmarSenha){
    return {ok: false, message: "Senhas não coincidem"}
  }

  const db = await client.db(process.env.DB_NAME);
  const novoUsuario = { email: email, name: nome, documento: documento };
  const novoLogin = { email: email, senha: senha, tipo: 'user' };
  await db.collection('users').insertOne(novoUsuario, function (err, result) {
  }).catch((err) => {
    console.log(err);
    return {ok: false, message: "Erro interno"}
  });

  /*await db.collection('login').insertOne(novoLogin, function (err, result) {
    console.log(result.ops[0]);
  }).catch((err) => {
    console.log(err);
    return {ok: false, message: "Erro interno"}
  });*/
  return {ok: true}

}

module.exports = {
  insereNovoUsuario,
}