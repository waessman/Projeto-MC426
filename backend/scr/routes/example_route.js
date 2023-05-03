const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/controller_example'); //example controller

/* Routes from an API rest can be post, get, delete, put */

router.get('/', exampleController.msgExample);

module.exports = router;