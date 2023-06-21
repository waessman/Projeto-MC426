const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

describe('Teste de cadastro de empresa', function() {
  let db;
  // conecta com o bd
  before((done) =>{
    const client = new MongoClient('mongodb+srv://inclusihire:MC426_inclusihire@cluster0.qmmz34t.mongodb.net/testy', { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db('inclusihire_test');
    done();
  })
  
  beforeEach(async function () {
    if (this.currentTest.parent.tests.indexOf(this.currentTest) === 0) {
      // limpa tabela user antes do primeiro teste
      await db.collection('users').deleteMany({});
    }
  });

    it('Deve cadastrar uma nova empresa', function(done) {
      const empresa = {
        nome: 'Empresa legal',
        documento: '1111111111',
        email: 'empresa@legal.com',
        senha: 'senhateste',
        confirmarSenha: 'senhateste'
      };
  
      chai.request('http://localhost:8080/')
        .post('empresa/cadastro')
        .send(empresa)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(true);
          done();
        });
    }).timeout(10000);

    it('Deve retornar erro se o e-mail for inválido', function(done) {
      const empresa = {
        nome: 'Empresa top',
        documento: '1111121111',
        email: 'empresa.top.com',
        senha: 'senhateste',
        confirmarSenha: 'senhateste'
      };
  
      chai.request('http://localhost:8080/')
        .post('empresa/cadastro')
        .send(empresa)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(false);
          const msg = res.body.err_msg
          expect(msg).to.be.equal("E-mail inválido");
          done();
        });
    }).timeout(10000);
  
    it('Deve retornar erro se o e-mail já estiver cadastrado', function(done) {
      const empresa = {
        nome: 'Empresa top',
        documento: '1111121111',
        email: 'empresa@legal.com',
        senha: 'senhateste',
        confirmarSenha: 'senhateste'
      };
  
      chai.request('http://localhost:8080/')
        .post('empresa/cadastro')
        .send(empresa)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(false);
          const msg = res.body.err_msg
          expect(msg).to.be.equal("E-mail já cadastrado");
          done();
        });
    }).timeout(10000);

    it('Deve retornar erro pois senhas não coincidem', function(done) {
      const empresa = {
        nome: 'Empresa legal 2',
        documento: '1111111111',
        email: 'empresa@legal2.com',
        senha: 'senhateste',
        confirmarSenha: 'senhatesteee'
      };
  
      chai.request('http://localhost:8080/')
        .post('empresa/cadastro')
        .send(empresa)
        .end(function(err, res) {
          const status = res.status;
          expect(status).to.be.equal(200);
          const ok = res.body.ok;
          expect(ok).to.be.equal(false);
          const msg = res.body.err_msg
          expect(msg).to.be.equal("Senhas não coincidem");
          done();
        });
    }).timeout(10000);
  });