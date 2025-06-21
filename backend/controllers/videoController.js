const Video = require('../models/Video');

// Criar um novo vídeo
const criarVideo = async (req, res) => {
  const { titulo, url, trilha_id } = req.body;

  if (!titulo || !url || !trilha_id) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios: título, url e trilha_id.' });
  }

  try {
    const novoVideo = await Video.create({ titulo, url, trilha_id });
    res.status(201).json(novoVideo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


// Listar todos os vídeos
const listarVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    console.error('Erro ao listar vídeos:', error);
    res.status(500).json({ erro: 'Erro interno ao listar vídeos.' });
  }
};

// Excluir vídeo
const excluirVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ erro: 'Vídeo não encontrado.' });
    }

    await video.destroy();
    res.json({ mensagem: 'Vídeo excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir vídeo:', error);
    res.status(500).json({ erro: 'Erro interno ao excluir vídeo.' });
  }
};

module.exports = {
  criarVideo,
  listarVideos,
  excluirVideo,
};
