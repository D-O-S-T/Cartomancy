// referenciaController.js
const { Referencia } = require('../models');

const criarReferencia = async (req, res) => {
  const { material_id, tipo_material, anotacao_id } = req.body;
  console.log('Dados recebidos para criar referência:', { material_id, tipo_material, anotacao_id });

  if (!material_id || !tipo_material) {
    return res.status(400).json({ erro: 'material_id e tipo_material são obrigatórios' });
  }

  try {
    const referencia = await Referencia.create({ material_id, tipo_material, anotacao_id });
    res.status(201).json(referencia);
  } catch (error) {
    console.error('Erro ao criar referência:', error);
    res.status(500).json({ erro: 'Erro ao criar referência' });
  }
};


module.exports = { criarReferencia };
