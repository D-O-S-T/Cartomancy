const Trilha = require('../models/Trilha');

exports.listar = async (req, res) => {
  const trilhas = await Trilha.findAll();
  res.json(trilhas);
};

exports.cadastrar = async (req, res) => {
  const { nome } = req.body;
  const novaTrilha = await Trilha.create({ nome });
  res.status(201).json(novaTrilha);
};

exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const trilha = await Trilha.findByPk(id);
  if (!trilha) return res.status(404).json({ erro: 'Trilha não encontrada' });

  trilha.nome = nome;
  await trilha.save();
  res.json(trilha);
};

exports.excluir = async (req, res) => {
  const { id } = req.params;
  const trilha = await Trilha.findByPk(id);
  if (!trilha) return res.status(404).json({ erro: 'Trilha não encontrada' });

  await trilha.destroy();
  res.json({ mensagem: 'Trilha removida com sucesso' });
};
