const express = require('express');
const router = express.Router();

const loginController = require('../controllers/controller_login'); 

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - email
 *               - senha
 *     responses:
 *       '200':
 *          description: ok true | token | user
 *       '404':
 *          description: ok false | err_msg
 */
router.post('/login', loginController.Login);

module.exports = router;