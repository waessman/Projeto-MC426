
async function insereNovaEmpresa(nome, documento, email, senha){
    const client = require('../configs/db.configs');
    if(!nome){
      return "Nome não pode ser vazio";
    }
    if(!documento){
      return "Documento não pode ser vazio";
    }
    if(!email){
      return "Email não pode ser vazio";
    }
    if(!senha){
      return "Senha não pode ser vazio";
    }
    if(!confirmarSenha){
      return "Confirmar senha não pode ser vazio";
    }
    if(senha != confirmarSenha){
      return "Senhas não coincidem";
    }

    const usuario = await getUserbyEmail(email);
    if (usuario != false){
      return "Email ja cadastrado";
    }
    
    const db = await client.db('inclusihire');
    const novaEmpresa = { email: email, nome: nome, documento: documento, senha: senha, tipo: 1};
    await db.collection('users').insertOne(novaEmpresa, function(err, result) {
      console.log(result.ops[0]);
      return true;
    }).catch((err) => {
      console.log(err);
      return err;
   });
    
}

async function getUserbyEmail(email){
  const client = require('../configs/db.configs');
  
  const db = await client.db('inclusihire');
  await db.collection('users').find({email: email}, function(err, result){
    if (err) return err;
    return result[0];
  });
  
}

module.exports = {
  insereNovaEmpresa,
  getUserbyEmail,
}