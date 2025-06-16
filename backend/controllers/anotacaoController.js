
const Anotacao = require('../models/Anotacao');
const Referencia = require('../models/Referencia');
const Trilha = require('../models/Trilha');
const User = require('../models/Usuario');

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
    //dados vindos do front
    const { conteudo, usuario_id, trilha_id, tipo, id_original } = req.body;

    console.log('tipo:', tipo, 'id_original:', id_original);

    if (!usuario_id || !trilha_id) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes: usuario_id e trilha_id são necessários.' });
    }

    let referencia = null;

    // Só cria a referência se foi enviado
    if (tipo && id_original) {
      referencia = await Referencia.create({
        tipo_material: tipo,
        material_id: id_original
      });
      console.log('Referência criada:', referencia);
    } else {
      console.log('Não foi enviado tipo ou id_original, não cria referência.');
  }

    const anotacao = await Anotacao.create({
    conteudo,
    usuario_id,
    trilha_id,
    referencia_id: referencia ? referencia.id : null
  });

  return res.status(201).json(anotacao);

} catch (erro) {
  console.error(erro);
  return res.status(500).json({ erro: 'Erro ao criar anotação' });
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
