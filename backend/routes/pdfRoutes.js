const express = require('express');
const router = express.Router();
const { listarPdf } = require('../controllers/pdfController');

router.get('/', listarPdf);
module.exports = router;
