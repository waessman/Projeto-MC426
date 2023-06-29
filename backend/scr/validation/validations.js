function validaEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const client = require('../configs/db.configs');
const db = client.db(process.env.DB_NAME);

async function verificaEmailDuplicado(email){
    
    const usuarioExistente = await db.collection('users').findOne({ email: email });
    if (usuarioExistente)
        return true
    return false
    
}

async function User_curriculo(email){
    
    const usuarioExistente = await db.collection('users').findOne({ email: email });
    if (usuarioExistente.curriculo != '')
        return true
    return false
    
}

async function getNextId(sequenceName){
    var ret = await db.collection('counters').findOneAndUpdate(
         { _id: sequenceName },
         { $inc : { seq: 1 } },
         {upsert: true}
        
    );
    return ret.seq;
  }

module.exports = {
    validaEmail,
    verificaEmailDuplicado,
    getNextId,
    User_curriculo
};
