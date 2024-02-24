const express = require('express');
const router = express.Router();
const compileController = require('../controllers/compileController');

router.post('/', compileController.compileCode);

module.exports = router;
