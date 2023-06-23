const client = require('../configs/db.configs');
var db = client.db(process.env.DB_NAME);
var validation = require('../validation/validations');
const { ObjectId } = require('mongodb');

async function user_by_id(email) {
    const result = await db.collection('users').find({ email: email }).toArray();
    if (result)
        return { ok: true, result: result }
    else
        return { ok: false, message: 'Processo não encontrado' };
}

async function edit_user(email, nome, documento, senha) {
    const result = await db.collection('users').findOneAndUpdate({ email: email }, {
        $set: {
            nome: nome, documento: documento, senha: senha
        }
    }, { new: true });
    if (result.value)
        return { ok: true }
    else
        return { ok: false, message: 'Processo não encontrado' };
}

module.exports = {
    user_by_id,
    edit_user,
}
