// routes/referencias.js
const express = require('express');
const router = express.Router();
const referenciaController = require('../controllers/referenciaController');

router.post('/', referenciaController.criarReferencia);

module.exports = router;
