const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);


describe('Teste de Login', function() {
  let db;
  // Antes dos testes conectar com o bd
  before((done) =>{
    const client = new MongoClient('mongodb+srv://inclusihire:MC426_inclusihire@cluster0.qmmz34t.mongodb.net/testy', { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db('inclusihire_test');
    done();
  })
  
  beforeEach(async function () {
    if (this.currentTest.parent.tests.indexOf(this.currentTest) === 0) {
      // Excluir todos os dados da tabela 'users' apenas para o primeiro teste
      await db.collection('users').deleteMany({});

      // Cadastrar o usuario na tabela 'users'
      const usuario = {
        email: 'joao.silva@teste.com',
        nome: 'João da Silva',
        documento: '1111111111',
        senha: 'senhateste',
        tipo: 2
      };
      await db.collection('users').insertOne(usuario);
    }
  });

    it('Deve retornar erro ao tentar logar com um email não cadastrado', function(done) {
      
      const usuario = {
        email: 'joao@teste.com',
        senha: 'senhateste',
      };
  
      chai.request('http://localhost:8080/')
        .post('login')
        .send(usuario)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(false);
          const msg = res.body.err_msg
          expect(msg).to.be.equal("Usuário não encontrado");
          done();
        });
    }).timeout(10000);
  
    it('Deve retornar erro ao tentar logar com uma senha incorreta', function(done) {
      const usuario = {
        email: 'joao.silva@teste.com',
        senha: 'senhaerrada',
      };
  
      chai.request('http://localhost:8080/')
        .post('login')
        .send(usuario)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(false);
          const msg = res.body.err_msg
          expect(msg).to.be.equal("Senha não corresponde");
          done();
        });
    }).timeout(10000);

    it('Deve conseguir logar com email e senha corretos', function(done) {
      const usuario = {
        email: 'joao.silva@teste.com',
        senha: 'senhateste',
      };
  
      chai.request('http://localhost:8080/')
        .post('login')
        .send(usuario)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(true);
          done();
        });
    }).timeout(10000);
  });