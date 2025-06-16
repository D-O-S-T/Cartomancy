const Video = require('../models/Video');

const listarVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar vídeos' });
  }
};

module.exports = {
  listarVideos
};
