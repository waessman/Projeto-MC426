
async function insereNovaEmpresa(nome, documento, email, senha, confirmarSenha){
    const client = require('../configs/db.configs');
    var db = client.db(process.env.DB_NAME);
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

    var usuario = await getUserbyEmail(email);
    if (usuario){
      return "E-mail já cadastrado";
    }

    const novaEmpresa = { email: email, nome: nome, documento: documento, senha: senha, tipo: 1};
     const result = await db.collection('users').insertOne(novaEmpresa);
     return result.acknowledged;
    
}

async function getUserbyEmail(email){
  const client = require('../configs/db.configs');
  const db = client.db(process.env.DB_NAME);
  const query = { "email": email };
  const result = await db.collection('users').find(query).toArray();
  return result[0];
  
}

module.exports = {
  insereNovaEmpresa,
  getUserbyEmail,
}