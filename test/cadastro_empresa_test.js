const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);


describe('Teste de cadastro de usuário', function() {
    it('Deve cadastrar um novo usuário', function(done) {
      const usuario = {
        nome: 'João da Silva',
        documento: '1111111111',
        email: 'joao.silva@teste.com',
        senha: 'senhateste',
        confirmarSenha: 'senhateste'
      };
  
      chai.request('http://localhost:'+process.env.PORT)
        .post('/empresa/cadastro')
        .send(usuario)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.ok).to.be.true;
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
  
      chai.request('http://localhost:'+process.env.PORT)
        .post('/empresa/cadastro')
        .send(usuario)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.ok).to.be.false;
          expect(res.body.err_msg).to.be.equal("E-mail já cadastrado");
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
  
      chai.request('http://localhost:'+process.env.PORT)
        .post('/empresa/cadastro')
        .send(usuario)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.ok).to.be.false;
          expect(res.body.err_msg).to.be.equal("Senhas não coincidem");
          done();
        });
    }).timeout(1000);
  });
  