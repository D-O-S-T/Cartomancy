const express = require('express');
const router = express.Router();
const { listarVideos } = require('../controllers/videoController');

router.get('/', listarVideos);

module.exports = router;
