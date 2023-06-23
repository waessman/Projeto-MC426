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

async function candidatar(usuario, vaga) {
    const result = await db.collection('process_candidatura').find({ user: usuario, process: vaga }).toArray();
    if (result.length <= 0) {
        const result2 = await db.collection('process_candidatura').insertOne({ user: usuario, process: vaga }, function (err, result) {
        }).catch((err) => {
            console.log(err);
            return { ok: false, err_msg: "Erro interno" }
        });
        return { ok: true, result: result2 }
    }

    return { ok: true, result: result[0] }

}

async function vagasCandidato(candidato) {
    const result = await db.collection('process_candidatura').find({ user: candidato }).toArray();
    if (result.length > 0) {
        const processIds = result.map(item => new ObjectId(item.process));
        const processess = await db.collection('process').find
        ({ _id: { $in: processIds } }).toArray();
        return { ok: true, result: processess }
    }
    return {ok: false, result: "Nenhuma vaga encontrada"}
}

async function candidatos(processo) {
    const result = await db.collection('process_candidatura').find({ process: processo }).toArray();
    if (result.length > 0) {
        const userIds = result.map(item => new ObjectId(item.user));
        const users = await db.collection('users').find
            ({ _id: { $in: userIds } }).project({ nome: 1, curriculo: 1 }).toArray();
        return { ok: true, result: users }
    }

    return { ok: false, message: 'Nenhum candidato encontrado' }

}
module.exports = {
    criar,
    deletar,
    todos_processos_empresa,
    todos_processos_ativos_empresa,
    detalhes_processo_empresa,
    editar,
    fechar,
    processos_filtro,
    candidatar,
    candidatos,
    vagasCandidato
};
