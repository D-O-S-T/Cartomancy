const Carta = require('../models/Carta');
const Video = require('../models/Video');
const Pdf = require('../models/Pdf');

async function buscarMaterial(tipo, id) {
  switch (tipo) {
    case 'carta':
      return await Carta.findByPk(id);
    case 'video':
      return await Video.findByPk(id);
    case 'pdf':
      return await Pdf.findByPk(id);
    default:
      console.warn(`Tipo de material desconhecido: ${tipo}`);
      return null;
  }
}

module.exports = { buscarMaterial };
