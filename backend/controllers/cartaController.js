const Carta = require('../models/Carta');

const listarCartas = async (req, res) => {
  try {
    const cartas = await Carta.findAll();
    res.json(cartas);
  } catch (error) {
    console.error('❌ ERRO AO BUSCAR CARTAS:', error); // <-- log do erro
    res.status(500).json({ erro: 'Erro ao buscar cartas.' });
  }
};

const editarCarta = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const carta = await Carta.findByPk(id);
    if (!carta) {
      return res.status(404).json({ erro: 'Carta não encontrada.' });
    }

    await carta.update(dados);
    res.json(carta);
  } catch (error) {
    console.error('❌ ERRO AO ATUALIZAR CARTA:', error); // <-- log do erro
    res.status(500).json({ erro: 'Erro ao atualizar carta.' });
  }
};

module.exports = {
  listarCartas,
  editarCarta
};
