const client = require('../configs/db.configs');
var db = client.db(process.env.DB_NAME);
var validation = require('../validation/validations');
const { ObjectId } = require('mongodb');

async function criar(nome, descricao, link_externo, requisitos, local, contato, empresa) {
    const novoProcesso = {
        nome: nome, empresa_id: empresa, descricao: descricao, link_externo: link_externo, requisitos: requisitos, local: local, contato: contato,
        status: 'Aberto'
    };
    novoProcesso._id = await validation.getNextId('processId');
    await db.collection('process').insertOne(novoProcesso, function (err, result) {
    }).catch((err) => {
        console.log(err);
        return { ok: false, err_msg: "Erro interno" }
    });
    return { ok: true }

}

async function deletar(id, empresa) {
    const objectId = new ObjectId(id);
    await db.collection('process').findOneAndUpdate({ _id: objectId, empresa_id: empresa }, { $set: { status: 'Deletado' } });
    return { ok: true }
}

async function fechar(id) {
    console.log("Oi", id);
    const objectId = new ObjectId(id);
    const update = { $set: { status: 'Encerrado' } };
    const options = { returnOriginal: false };

    try {
        const result = await db.collection('process').findOneAndUpdate(
            { _id: objectId },
            update,
            options
        );

        if (result.value) {
            const processoAtualizado = await db.collection('process').findOne({ _id: objectId });
            return { ok: true, processo: processoAtualizado };

        } else {
            return { ok: false, message: 'Processo não encontrado' };
        }
    } catch (error) {
        console.log('Erro ao fechar o processo:', error);
        return { ok: false, message: 'Erro ao fechar o processo' };
    }
}








async function todos_processos_empresa(empresa) {
    const result = await db.collection('process').find({ empresa_id: empresa }).toArray();

    return { ok: true, processos: result }

}

async function todos_processos_ativos_empresa(empresa) {
    const result = await db.collection('process').find({ empresa_id: empresa, status: 'Aberto' }).toArray();

    return { ok: true, processos: result }

}

async function detalhes_processo_empresa(id) {
    const objectId = new ObjectId(id);
    const result = await db.collection('process').findOne({ _id: objectId });

    return { ok: true, processo: result }

}

async function editar(id, nome, descricao, link_externo, requisitos, local, contato, status) {
    const objectId = new ObjectId(id);
    console.log("estoi aque", id, nome, descricao, link_externo, requisitos, local, contato, status)
    const result = await db.collection('process').findOneAndUpdate({ _id: objectId }, {
        $set: {
            nome: nome, descricao: descricao,
            link_externo: link_externo, requisitos: requisitos, local: local, contato: contato, status: status
        }
    }, { new: true });
    if (result.value)
        return { ok: true }
    else
        return { ok: false, message: 'Processo não encontrado' };
}


async function processos_filtro(filtro) {
    if (filtro == "" || filtro == null) {
        const result = await db.collection('process').find({ status: 'Aberto' }).sort({ _id: -1 }).toArray();
        return { ok: true, processos: result }
    }
    else {
        const ex = new RegExp(filtro);
        const busca = {
            $or: [
                { nome: ex, status: 'Aberto' },
                { descricao: ex, status: 'Aberto' },
            ]
        };
        const result = await db.collection('process').find(busca).sort({ _id: -1 }).toArray();
        return { ok: true, processos: result }
    }




}
module.exports = {
    criar,
    deletar,
    todos_processos_empresa,
    todos_processos_ativos_empresa,
    detalhes_processo_empresa,
    editar,
    fechar,
    processos_filtro
};