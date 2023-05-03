
async function insereNovoUsuario(nome, documento, email, senha){
    const client = require('../configs/db.configs');
    
    const db = await client.db('inclusihire');
    const novoUsuario = { email: email, name: nome, documento: documento };
    const novoLogin = { email: email, senha: senha, tipo:'user'};
    await db.collection('usuarios').insertOne(novoUsuario, function(err, result) {
      console.log("testtt");
    }).catch((err) => {
      console.log(err);
      return false;
   });

   await db.collection('login').insertOne(novoLogin, function(err, result) {
    console.log(result.ops[0]);
  }).catch((err) => {
    console.log(err);
    return false;
  });
  return true;
  
}

module.exports = {
  insereNovoUsuario,
}