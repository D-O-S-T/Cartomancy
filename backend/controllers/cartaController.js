const axios = require('axios');

const gerarSlug = (nome) => {
  return nome
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const listarCartas = async (req, res) => {
  try {
    const resTexto = await axios.get('https://raw.githubusercontent.com/ekelen/tarot-api/main/static/card_data.json');
    const cartasTexto = resTexto.data.cards;

    const cartasFinal = cartasTexto.map(carta => ({
      slug: gerarSlug(carta.name),
      name: carta.name,
      name_short: carta.name_short,
      type: carta.type,
      meaning_up: carta.meaning_up,
      meaning_rev: carta.meaning_rev,
      desc: carta.desc,
      img_url: `https://raw.githubusercontent.com/krates98/tarotcardapi/main/images/${gerarSlug(carta.name).replace(/-/g, '')}.jpeg`
    }));

    res.json(cartasFinal);
  } catch (error) {
    console.error('❌ ERRO AO BUSCAR CARTAS:', error.message);
    res.status(500).json({ erro: 'Erro ao buscar cartas.' });
  }
};

const buscarCarta = async (req, res) => {
  try {
    const slugParam = req.params.slug.toLowerCase().trim();

    const resTexto = await axios.get('https://raw.githubusercontent.com/ekelen/tarot-api/main/static/card_data.json');
    const cartasTexto = resTexto.data.cards;

    const carta = cartasTexto.find(c => gerarSlug(c.name) === slugParam);

    if (!carta) {
      return res.status(404).json({ erro: 'Carta não encontrada.' });
    }

    const cartaFinal = {
      slug: gerarSlug(carta.name),
      name: carta.name,
      name_short: carta.name_short,
      type: carta.type,
      meaning_up: carta.meaning_up,
      meaning_rev: carta.meaning_rev,
      desc: carta.desc,
      img_url: `https://raw.githubusercontent.com/krates98/tarotcardapi/main/images/${gerarSlug(carta.name).replace(/-/g, '')}.jpeg`
    };

    res.json(cartaFinal);
  } catch (error) {
    console.error('❌ ERRO AO BUSCAR CARTA:', error.message);
    res.status(500).json({ erro: 'Erro ao buscar carta.' });
  }
};

module.exports = {
  listarCartas,
  buscarCarta
};
