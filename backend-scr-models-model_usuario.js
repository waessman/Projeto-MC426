
async function insereNovoUsuario(nome, documento, email, senha) {
  const client = require('../configs/db.configs');

  const { validaEmail, verificaEmailDuplicado } = require('../validation/validations');

  if(!validaEmail(email)){
    return {ok: false, message: "E-mail inválido"}
  }

  if(await verificaEmailDuplicado(email)){
    return {ok: false, message: "E-mail duplicado"}
  }

  const db = await client.db('inclusihire');
  const novoUsuario = { email: email, name: nome, documento: documento };
  const novoLogin = { email: email, senha: senha, tipo: 'user' };
  await db.collection('usuarios').insertOne(novoUsuario, function (err, result) {
    console.log("testtt");
  }).catch((err) => {
    console.log(err);
    return {ok: false, message: "Erro interno"}
  });

  await db.collection('login').insertOne(novoLogin, function (err, result) {
    console.log(result.ops[0]);
  }).catch((err) => {
    console.log(err);
    return {ok: false, message: "Erro interno"}
  });
  return {ok: true}

}

module.exports = {
  insereNovoUsuario,
}