const express = require('express');
const router = express.Router();

const empresaController = require('../controllers/controller_cadastro'); 
const processController = require('../controllers/controller_processos'); 
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;

router.post('/cadastro', empresaController.empresaCadastro);
router.post('/novo_processo', checkJWT, processController.Criar_processo);
router.delete('/processo', checkJWT, processController.Deletar_processo);
router.get('/processos', checkJWT, processController.Get_proc_empresa);
router.post('/get_processo', processController.get_processo);

module.exports = router;