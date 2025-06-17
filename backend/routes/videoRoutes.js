const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Listar todos os vídeos
router.get('/', videoController.listarVideos);

// Criar novo vídeo
router.post('/', videoController.criarVideo);

// Excluir vídeo pelo id
router.delete('/:id', videoController.excluirVideo);

module.exports = router;

