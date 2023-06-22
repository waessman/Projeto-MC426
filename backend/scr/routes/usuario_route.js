const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/controller_cadastro'); 
const processController = require('../controllers/controller_processos');
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;

/**
 * @swagger
 * /usuario/cadastro:
 *   post:
 *     summary: Insere um novo usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               documento:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               confirmarSenha:
 *                 type: string
 *             required:
 *               - nome
 *               - documento
 *               - email
 *               - senha
 *               - confirmarSenha
 *     responses:
 *       '200':
 *          description : ok true
 *       '404':
 *          description: ok false | err_msg
 */
router.post('/cadastro', usuarioController.usuarioCadastro);
router.post('/get_processo', checkJWT, processController.User_get_processos); // /usuario/get_processo
router.post('/candidatar', processController.user_candidatar)

module.exports = router;
