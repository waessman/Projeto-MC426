const express = require('express');
const router = express.Router();

const empresaController = require('../controllers/controller_cadastro'); 

router.post('/cadastro', empresaController.empresaCadastro);

module.exports = router;