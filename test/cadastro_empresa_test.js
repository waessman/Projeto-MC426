const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);




describe('Teste de cadastro de usuário', function() {
  let db;
  //Antes dos testes conectar com o bd
  before((done) =>{
    const client = new MongoClient('mongodb+srv://inclusihire:MC426_inclusihire@cluster0.qmmz34t.mongodb.net/testy', { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db('inclusihire_test');
    done();
  })
  
  beforeEach(async function () {
    if (this.currentTest.parent.tests.indexOf(this.currentTest) === 0) {
      // Excluir todos os dados da tabela 'users' apenas para o primeiro teste
      await db.collection('users').deleteMany({});
    }
  });

    it('Deve cadastrar um novo usuário', function(done) {
      const usuario = ({
        "nome": 'João da Silva',
        "documento": '1111111111',
        "email": 'joao.silva@teste.com',
        "senha": 'senhateste',
        "confirmarSenha": 'senhateste'
      });
  
      chai.request('http://localhost:8080/')
        .post('empresa/cadastro')
        .send(usuario)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(true);
          done();
        });
    }).timeout(1000);
  
    it('Deve retornar erro se o e-mail já estiver cadastrado', function(done) {
      const usuario = {
        nome: 'Maria da Silva',
        documento: '1111111111',
        email: 'joao.silva@teste.com',
        senha: 'senhateste',
        confirmarSenha: 'senhateste'
      };
  
      chai.request('http://localhost:8080/')
        .post('empresa/cadastro')
        .send(usuario)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(false);
          const msg = res.body.err_msg
          expect(msg).to.be.equal("E-mail já cadastrado");
          done();
        });
    }).timeout(1000);

    it('Deve retornar erro pois senhas não coincidem', function(done) {
      const usuario = {
        nome: 'Maria da Silva',
        documento: '1111111111',
        email: 'maria.silva@teste.com',
        senha: 'senhateste',
        confirmarSenha: 'senhateste1'
      };
  
      chai.request('http://localhost:8080/')
        .post('empresa/cadastro')
        .send(usuario)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(false);
          const msg = res.body.err_msg
          expect(msg).to.be.equal("Senhas não coincidem");
          done();
        });
    }).timeout(1000);
  });