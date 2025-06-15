const Anotacao = require('../models/Anotacao');

const listarAnotacao = async (req, res) => {
  try {
    const anotacoes = await Anotacao.findAll();
    res.json(anotacoes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar anotações', detalhes: error.message });
  }
};

const criarAnotacao = async (req, res) => {
  try {
    const nova = await Anotacao.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar anotação', detalhes: error.message });
  }
};

const editarAnotacao = async (req, res) => {
  try {
    const { id } = req.params;
    const [editadas] = await Anotacao.update(req.body, { where: { id } });

    if (editadas === 0) return res.status(404).json({ erro: 'Anotação não encontrada' });

    res.json({ mensagem: 'Anotação editada com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar anotação', detalhes: error.message });
  }
};

const excluirAnotacao = async (req, res) => {
  try {
    const { id } = req.params;
    const apagadas = await Anotacao.destroy({ where: { id } });

    if (apagadas === 0) return res.status(404).json({ erro: 'Anotação não encontrada' });

    res.json({ mensagem: 'Anotação apagada com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao excluir anotação', detalhes: error.message });
  }
};

module.exports = {
  listarAnotacao,
  criarAnotacao,
  editarAnotacao,
  excluirAnotacao
};
