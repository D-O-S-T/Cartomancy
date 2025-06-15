const Trilha = require('../models/Trilha');

const listarTrilha = async (req, res) => {
  try {
    const trilhas = await Trilha.findAll();
    res.json(trilhas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar trilhas', detalhes: error.message });
  }
};

const cadastrarTrilha = async (req, res) => {
  try {
    const { nome } = req.body;
    const novaTrilha = await Trilha.create({ nome });
    res.status(201).json(novaTrilha);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar trilha', detalhes: error.message });
  }
};

const atualizarTrilha = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const trilha = await Trilha.findByPk(id);

    if (!trilha) return res.status(404).json({ erro: 'Trilha não encontrada' });

    trilha.nome = nome;
    await trilha.save();
    res.json(trilha);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar trilha', detalhes: error.message });
  }
};

const excluirTrilha = async (req, res) => {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findByPk(id);

    if (!trilha) return res.status(404).json({ erro: 'Trilha não encontrada' });

    await trilha.destroy();
    res.json({ mensagem: 'Trilha removida com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao excluir trilha', detalhes: error.message });
  }
};

module.exports = {
  listarTrilha,
  cadastrarTrilha,
  atualizarTrilha,
  excluirTrilha
};
