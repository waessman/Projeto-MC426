const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
// TODO: editar as URLs dos posts quando ficar pronta a feature

function fazerLogin(login) {
  return new Promise((resolve, reject) => {
    chai.request('http://localhost:8080/')
      .post('login')
      .send(login)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body.token);
      });
  });
}

describe('Teste de criação de processos', function() {
  let db;
  // conecta com o bd
  before((done) =>{
    const client = new MongoClient('mongodb+srv://inclusihire:MC426_inclusihire@cluster0.qmmz34t.mongodb.net/testy', { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db('inclusihire_test');
    done();
  })
  
  beforeEach(async function () {
    if (this.currentTest.parent.tests.indexOf(this.currentTest) === 0) {
      // limpa tabelas process e user antes do primeiro teste
      await db.collection('process').deleteMany({});
      await db.collection('users').deleteMany({});

      // cadastra uma empresa e um usuário pra usar nos testes
      const empresa = {
        nome: 'Empresa legal',
        documento: '7171771717',
        email: 'empresa@hotmail.com',
        senha: 'senhateste',
        tipo: 1
      };
      await db.collection('users').insertOne(empresa);

      const usuario = {
        email: 'usuario@hotmail.com',
        nome: 'João da Silva',
        documento: '1111111111',
        senha: 'senhateste',
        tipo: 2
      };
      await db.collection('users').insertOne(usuario);
    }
  });

    it('Deve criar um novo processo como empresa', function(done) {
      const processo = {
        nome: 'Processo poggers',
        descricao: 'essa vaga é muito boa e tal',
        link_externo: 'https://site.empresa.org',
        requisitos: 'passar em MC558',
        local: 'Itaquaquecetuba',
        contato: '(99)99999-9999',
        userInfo: 'empresa@hotmail.com'
      };

      const login = {
        email: 'empresa@hotmail.com',
        senha: 'senhateste'
      }

      // faz login como empresa
      fazerLogin(login)
        .then(token =>{
            // tenta criar processo
            chai.request('http://localhost:8080/')
            .post('empresa/novo_processo')
            .set('authorization', token)
            .send(processo)
            .end(function(err, res) {
              const status = res.status;
              expect(status).to.be.equal(200);
              const ok = res.body.ok;
              expect(ok).to.be.equal(true);
              done();
            });
        })
    }).timeout(10000);

    it('Deve retornar erro ao tentar criar processo como usuário', function(done) {
        const processo = {
          nome: 'Processo poggers',
          descricao: 'essa vaga é muito boa e tal',
          link_externo: 'https://site.empresa.org',
          requisitos: 'passar em MC558',
          local: 'Itaquaquecetuba',
          contato: '(99)99999-9999',
          userInfo: 'empresa@hotmail.com'
        };
    
        const login = {
          email: 'usuario@hotmail.com',
          senha: 'senhateste'
        }
  
        // faz login como empresa
        fazerLogin(login)
          .then(token =>{
              // tenta criar processo
              chai.request('http://localhost:8080/')
              .post('empresa/novo_processo')
              .set('authorization', token)
              .send(processo)
              .end(function(err, res) {
                const status = res.status;
                expect(status).to.be.equal(404);
                const ok = res.body.ok;
                expect(ok).to.be.equal(false);
                const err_msg = res.body.err_msg;
                expect(err_msg).to.be.equal('Usuário não tem permissão.')
                done();
              });
          })
    }).timeout(10000);
    
    it('Deve retornar erro ao tentar criar processo sem estar logado', function(done) {
      const processo = {
        nome: 'Processo poggers',
        descricao: 'essa vaga é muito boa e tal',
        link_externo: 'https://site.empresa.org',
        requisitos: 'passar em MC558',
        local: 'Itaquaquecetuba',
        contato: '(99)99999-9999',
        userInfo: 'empresa@hotmail.com'
      };
  
      // tenta criar processo
      chai.request('http://localhost:8080/')
      .post('empresa/novo_processo')
      .send(processo)
      .end(function(err, res) {
        const status = res.status;
        expect(status).to.be.equal(401);
        const err_msg = res.body.msg;
        expect(err_msg).to.be.equal('Invalid Token')
        done();
      });
    }).timeout(10000);
});