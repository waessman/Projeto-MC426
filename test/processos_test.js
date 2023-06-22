const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
// TODO: editar as URLs dos posts quando ficar pronta a feature

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
        tipo: 2
      };
      await db.collection('users').insertOne(empresa);

      const usuario = {
        email: 'usuario@hotmail.com',
        nome: 'João da Silva',
        documento: '1111111111',
        senha: 'senhateste',
        tipo: 1
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
        local: 'passar em MC558',
        contato: 'passar em MC558',
        userInfo: 'empresa@hotmail.com'
      };
  
      chai.request('http://localhost:8080/')
        .post('processo/cadastro')
        .send(processo)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(true);
          done();
        });
    }).timeout(10000);

    it('Deve retornar erro ao tentar criar processo como usuário', function(done) {
        const processo = {
          nome: 'Processo poggers',
          descricao: 'essa vaga é muito boa e tal',
          link_externo: 'https://site.empresa.org',
          requisitos: 'passar em MC558',
          local: 'passar em MC558',
          contato: 'passar em MC558',
          userInfo: 'usuario@hotmail.com'
        };
    
        chai.request('http://localhost:8080/')
          .post('processo/cadastro')
          .send(processo)
          .end(function(err, res) {
            const status = res.status;
            expect(status).to.be.equal(404);
            const ok = res.body.ok;
            expect(ok).to.be.equal(false);
            const err_msg = res.err_msg;
            expect(err_msg).to.be.equal("Usuário não tem permissão.")
            done();
          });
      }).timeout(10000);
  });