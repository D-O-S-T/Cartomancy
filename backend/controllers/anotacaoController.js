const Anotacao = require('../models/Anotacao');
const Referencia = require('../models/Referencia');

const listarAnotacao = async (req, res) => {
  try {
    const anotacoes = await Anotacao.findAll();
    res.json(anotacoes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar anotações', detalhes: error.message });
  }
};

const criarAnotacao = async (req, res) => {
  const { conteudo, tipo_material, material_id } = req.body;

  if (!conteudo || !tipo_material || !material_id) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  try {
    // 1. Busca ou cria a referência
    const [referencia] = await Referencia.findOrCreate({
      where: { tipo_material, material_id }
    });

    // 2. Cria a anotação com essa referência
    const anotacao = await Anotacao.create({
      conteudo,
      referencia_id: referencia.id
    });

    return res.status(201).json(anotacao);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar anotação', detalhes: err.message });
  }
};

const editarAnotacao = async (req, res) => {
  const { id } = req.params;
  const { conteudo } = req.body;

  try {
    const anotacao = await Anotacao.findByPk(id);

    if (!anotacao) {
      return res.status(404).json({ erro: 'Anotação não encontrada' });
    }

    // Garante que apenas o conteúdo será atualizado
    anotacao.conteudo = conteudo;
    await anotacao.save();

    res.json(anotacao);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar anotação', detalhes: error.message });
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
