const client = require('../configs/db.configs');
var db = client.db(process.env.DB_NAME);
var validation = require('../validation/validations');
const { ObjectId } = require('mongodb');

async function criar(nome, descricao, link_externo, requisitos, local, contato, empresa){
    const novoProcesso = { nome: nome, empresa_id: empresa, descricao: descricao, link_externo: link_externo, requisitos: requisitos, local: local, contato: contato, 
                           status: 'Aberto'};
    novoProcesso._id = await validation.getNextId('processId');
    await db.collection('process').insertOne(novoProcesso, function (err, result) {
    }).catch((err) => {
      console.log(err);
      return {ok: false, err_msg: "Erro interno"}
    });
    return {ok: true}

}

async function deletar(id, empresa){
    const objectId = new ObjectId(id);
    await db.collection('process').findOneAndUpdate({ _id: objectId, empresa_id: empresa },  { $set : { status: 'Deletado'} });
    return {ok: true}
}

async function todos_processos_empresa(empresa){
    const result = await db.collection('process').find({ empresa_id: empresa }).toArray();
    
    return {ok: true, processos: result}
       
}

async function get_by_id(id){
    const result = await db.collection('process').findOne({_id: new ObjectId(id)});
    return {ok: true, data: result}
}

module.exports = {
    criar,
    deletar,
    todos_processos_empresa,
    get_by_id,
  };