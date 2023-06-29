const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/controller_usuarios'); 
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;


router.post('/get',checkJWT, usuarioController.GetUser);
router.post('/edit',checkJWT, usuarioController.editUser);

module.exports = router;

/**
 * @swagger
 * /put:
 *   post:
 *     summary: Editar dados de usuario
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
 *               documento:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - nome
 *               - documento
 *               - email
 *               - senha
 *     responses:
 *       '200':
 *          description : ok true
 *       '404':
 *          description: ok false | err_msg
 */


/**
 * @swagger
 * /put:
 *   post:
 *     summary: Editar dados de usuario
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
 *          description : ok true | usuario
 *       '404':
 *          description: ok false | err_msg
 */
