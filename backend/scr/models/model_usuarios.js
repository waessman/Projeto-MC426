const client = require('../configs/db.configs');
var db = client.db(process.env.DB_NAME);
var validation = require('../validation/validations');
const { ObjectId } = require('mongodb');

async function user_by_id(email) {
    const result = await db.collection('users').find({ email: email }).toArray();
    if (result)
        return { ok: true, result: result }
    else
        return { ok: false, message: 'Usuario não encontrado' };
}

async function edit_user(email, nome, documento, curriculo) {
    const result = await db.collection('users').findOneAndUpdate({ email: email }, {
        $set: {
            nome: nome, documento: documento, curriculo: curriculo
        }
    }, { new: true });
    if (result.value)
        return { ok: true }
    else
        return { ok: false, message: 'Usuario não encontrado' };
}

module.exports = {
    user_by_id,
    edit_user,
}
