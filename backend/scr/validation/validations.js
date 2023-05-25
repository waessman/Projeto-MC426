function validaEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const client = require('../configs/db.configs');
const db = client.db('inclusihire');

async function verificaEmailDuplicado(email){
    
    const usuarioExistente = await db.collection('login').findOne({ email: email });
    if (usuarioExistente)
        return true
    return false
    
}

module.exports = {
    validaEmail,
    verificaEmailDuplicado
};