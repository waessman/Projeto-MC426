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

module.exports = {
    validaEmail,
    verificaEmailDuplicado
};