const express = require('express');
const router = express.Router();

const empresaController = require('../controllers/controller_cadastro'); 
const processController = require('../controllers/controller_processos'); 
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;


router.post('/cadastro', empresaController.empresaCadastro);
router.post('/novo_processo', checkJWT, processController.Criar_processo);
router.put('/delete_processo', checkJWT, processController.Deletar_processo);
router.put('/edit_processo', checkJWT, processController.Editar_processo);
router.get('/all_processos', checkJWT, processController.Get_todos_processos);
router.get('/processos', checkJWT, processController.Get_processos_ativos); //Ativos
router.get('/get_processo', checkJWT, processController.GetById);
router.put('/close_processo', checkJWT, processController.Fechar_processo);

/**
 * @swagger
 * /empresa/cadastro:
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


/**
 * @swagger
 * /empresa/novo_processo:
 *   post:
 *     summary: Insere um novo Processo de vaga
 *     parameters:
 *       - in: header
 *         name: active
 *         schema:
 *           type: object
 *           properties:
 *             authorization:
 *               type: string
 *         description: Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               link_externo:
 *                 type: string
 *               requisitos:
 *                 type: string
 *               local:
 *                 type: string
 *               contato:
 *                 type: string
 *             required:
 *               - nome
 *               - descricao
 *               - requisitos
 *               - local
 *               - contato
 *     responses:
 *       '200':
 *          description : ok true
 *       '404':
 *          description: ok false | err_msg
 */


/**
 * @swagger
 * /empresa/deletar_processo:
 *   put:
 *     summary: Altera o status de um Processo de vaga para Deletado
 *     parameters:
 *       - in: header
 *         name: active
 *         schema:
 *           type: object
 *           properties:
 *             authorization:
 *               type: string
 *         description: Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             required:
 *               - id
 *     responses:
 *       '200':
 *          description : ok true
 *       '404':
 *          description: ok false | err_msg
 */


/**
 * @swagger
 * /empresa/processos/todos:
 *   get:
 *     summary: Get todos os processos de uma empresa
 *     parameters:
 *       - in: header
 *         name: active
 *         schema:
 *           type: object
 *           properties:
 *             authorization:
 *               type: string
 *         description: Token
 *     responses:
 *       '200':
 *          description : ok true | processos
 *       '404':
 *          description: ok false | err_msg
 */


/**
 * @swagger
 * /empresa/processos:
 *   get:
 *     summary: Get todos os processos ativos de uma empresa
 *     parameters:
 *       - in: header
 *         name: active
 *         schema:
 *           type: object
 *           properties:
 *             authorization:
 *               type: string
 *         description: Token
 *     responses:
 *       '200':
 *          description : ok true | processos
 *       '404':
 *          description: ok false | err_msg
 */


/**
 * @swagger
 * /empresa/edit_processo:
 *   put:
 *     summary: Altera um Processo de vaga
 *     parameters:
 *       - in: header
 *         name: active
 *         schema:
 *           type: object
 *           properties:
 *             authorization:
 *               type: string
 *         description: Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               link_externo:
 *                 type: string
 *               requisitos:
 *                 type: string
 *               local:
 *                 type: string
 *               contato:
 *                 type: string
 *             required:
 *               - id
 *     responses:
 *       '200':
 *          description : ok true
 *       '404':
 *          description: ok false | err_msg
 */

module.exports = router;