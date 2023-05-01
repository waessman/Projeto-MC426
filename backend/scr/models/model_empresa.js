
async function insereNovaEmpresa(nome, documento, email, senha){
    const client = require('../configs/db.configs');
    
    const db = await client.db('inclusihire');
    const novaEmpresa = { email: email, name: nome, documento: documento };
    const novoLogin = { email: email, senha: senha, tipo:'company'};
    await db.collection('empresas').insertOne(novaEmpresa, function(err, result) {
      console.log(result.ops[0]);
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
  insereNovaEmpresa,
}