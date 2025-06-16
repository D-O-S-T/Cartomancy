const Anotacao = require('../models/Anotacao');
const Referencia = require('../models/Referencia');
const Trilha = require('../models/Trilha');
const User = require('../models/Usuario');

const Carta = require('../models/Carta');
const Video = require('../models/Video');
const PDF = require('../models/Pdf');


// Controller para listar anotações
const listarAnotacao = async (req, res) => {
  try {
    // Busca anotações com a referencia relacionada
    const anotacao = await Anotacao.findAll({
      include: [{ model: Referencia, as: 'referencia' }]
    });

    // Para cada anotação, busca o título do material usando helper
    const resultado = await Promise.all(anotacao.map(async (anotacao) => {
      let materialNome = '(sem material)';

      if (anotacao.referencia) {
        const { tipo_material, material_id } = anotacao.referencia;


        if (tipo_material === 'carta') {
          const carta = await Carta.findByPk(material_id);
          if (carta) materialNome = carta.name || '(sem nome)';
        } else if (tipo_material === 'video') {
          const video = await Video.findByPk(material_id);
          if (video) materialNome = video.titulo || '(sem título)';
        } else if (tipo_material === 'pdf') {
          const pdf = await PDF.findByPk(material_id);
          if (pdf) materialNome = pdf.titulo || '(sem título)';
        }
      }

      return {
        id: anotacao.id,
        conteudo: anotacao.conteudo,
        usuario_id: anotacao.usuario_id,
        trilha_id: anotacao.trilha_id,
        material: materialNome
      };
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao listar anotações:', error);
    res.status(500).json({ erro: 'Erro ao listar anotações' });
  }
};


// CRIAR ANOTAÇÃO
const criarAnotacao = async (req, res) => {
  try {
    const { conteudo, usuario_id, trilha_id, tipo, id_original } = req.body;

    if (!usuario_id || !trilha_id) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes: usuario_id e trilha_id são necessários.' });
    }

    let referencia = null;
    if (tipo && id_original) {
      referencia = await Referencia.create({
        tipo_material: tipo,
        material_id: id_original
      });
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
    if (!anotacao) return res.status(404).json({ erro: 'Anotação não encontrada' });

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
