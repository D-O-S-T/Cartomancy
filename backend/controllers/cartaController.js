const axios = require("axios");
const fs = require("fs");
const path = require("path");

const gerarSlug = (nome) => {
  return nome
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Mapeamento dos nomes da API externa (inglês) para os nomes em português
const nomesPTporEN = {
  "The Fool": "O Louco",
  "The Magician": "O Mago",
  "The High Priestess": "A Sacerdotisa",
  "The Empress": "A Imperatriz",
  "The Emperor": "O Imperador",
  "The Hierophant": "O Hierofante",
  "The Lovers": "Os Amantes",
  "The Chariot": "O Carro",
  "Strength": "A Força",
  "The Hermit": "O Eremita",
  "Wheel of Fortune": "A Roda da Fortuna",
  "Wheel Of Fortune": "A Roda da Fortuna", // variação com "Of"
  "Justice": "A Justiça",
  "The Hanged Man": "O Enforcado",
  "Death": "A Morte",
  "Temperance": "A Temperança",
  "The Devil": "O Diabo",
  "The Tower": "A Torre",
  "The Star": "A Estrela",
  "The Moon": "A Lua",
  "The Sun": "O Sol",
  "Judgement": "O Julgamento",
  "The World": "O Mundo",
};

const carregarImagensLocais = () => {
  const caminho = path.join(__dirname, "../data/cartas.json");
  const json = fs.readFileSync(caminho, "utf-8");
  const cartas = JSON.parse(json);
  const mapa = {};
  cartas.forEach((c) => {
    mapa[c.nome] = c.imagem;
  });
  return mapa;
};

const listarCartas = async (req, res) => {
  try {
    const resposta = await axios.get("https://raw.githubusercontent.com/ekelen/tarot-api/main/static/card_data.json");
    const cartasAPI = resposta.data.cards;
    const imagensLocais = carregarImagensLocais();

    const cartasFinal = cartasAPI.map((carta) => {
      const nomeOriginal = carta.name.trim();
      const nomePT = nomesPTporEN[nomeOriginal] || null;
      const imagem = nomePT ? imagensLocais[nomePT] : null;

      return {
        slug: gerarSlug(carta.name),
        name: carta.name,
        name_short: carta.name_short,
        type: carta.type,
        meaning_up: carta.meaning_up,
        meaning_rev: carta.meaning_rev,
        desc: carta.desc,
        img_url: imagem || null,
        name_pt: nomePT,
        nome: nomePT || carta.name, // usado no front
      };
    });

    res.json(cartasFinal);
  } catch (error) {
    console.error("❌ ERRO AO BUSCAR CARTAS:", error.message);
    res.status(500).json({ erro: "Erro ao buscar cartas." });
  }
};

const buscarCarta = async (req, res) => {
  try {
    const slugParam = req.params.slug.toLowerCase().trim();

    const resposta = await axios.get("https://raw.githubusercontent.com/ekelen/tarot-api/main/static/card_data.json");
    const cartasAPI = resposta.data.cards;
    const carta = cartasAPI.find((c) => gerarSlug(c.name) === slugParam);

    if (!carta) {
      return res.status(404).json({ erro: "Carta não encontrada." });
    }

    const nomeOriginal = carta.name.trim();
    const nomePT = nomesPTporEN[nomeOriginal] || null;
    const imagensLocais = carregarImagensLocais();
    const imagem = nomePT ? imagensLocais[nomePT] : null;

    const cartaFinal = {
      slug: gerarSlug(carta.name),
      name: carta.name,
      name_short: carta.name_short,
      type: carta.type,
      meaning_up: carta.meaning_up,
      meaning_rev: carta.meaning_rev,
      desc: carta.desc,
      img_url: imagem || null,
      name_pt: nomePT,
      nome: nomePT || carta.name, // usado no front
    };

    res.json(cartaFinal);
  } catch (error) {
    console.error("❌ ERRO AO BUSCAR CARTA:", error.message);
    res.status(500).json({ erro: "Erro ao buscar carta." });
  }
};

module.exports = {
  listarCartas,
  buscarCarta,
};
