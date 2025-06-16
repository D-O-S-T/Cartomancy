const axios = require('axios');
const { sequelize } = require('../models/db');
const Carta = require('../models/Carta');

const importarCartas = async () => {
  try {
    await sequelize.sync();

    const url = 'https://raw.githubusercontent.com/ekelen/tarot-api/refs/heads/main/static/card_data.json';
    const resposta = await axios.get(url);
    const cartas = resposta.data.cards;

    for (const carta of cartas) {
      const { name, name_short, type, meaning_up, meaning_rev, desc } = carta;

      await Carta.findOrCreate({
        where: { name_short },
        defaults: { name, type, meaning_up, meaning_rev, desc }
      });
    }

    console.log('Cartas importadas com sucesso!');
  } catch (error) {
    console.error('Erro ao importar cartas:', error.message);
  }
};

module.exports = importarCartas; // se quiser chamar pela rota do backend

