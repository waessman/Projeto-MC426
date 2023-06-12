const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/controller_usuario'); 

router.post('/cadastro', usuarioController.usuarioCadastro);

module.exports = router;