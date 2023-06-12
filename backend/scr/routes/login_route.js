const express = require('express');
const router = express.Router();

const loginController = require('../controllers/controller_login'); 

router.post('/login', loginController.Login);

module.exports = router;