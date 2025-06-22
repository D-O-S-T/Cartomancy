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

// Função de normalização para padronizar nomes
const normalizar = (texto) => texto.trim().replace(/\s+/g, " ").toLowerCase();

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
  "Wheel Of Fortune": "A Roda da Fortuna",
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

  // Arcanos Menores - Valetes
  "Page of Wands": "Valete de Paus",
  "Page Of Wands": "Valete de Paus",
  "Page of Cups": "Valete de Copas",
  "Page of Swords": "Valete de Espadas",
  "Page of Pentacles": "Valete de Ouros",

  // Cavaleiros
  "Knight of Wands": "Cavaleiro de Paus",
  "Knight of Cups": "Cavaleiro de Copas",
  "Knight of Swords": "Cavaleiro de Espadas",
  "Knight of Pentacles": "Cavaleiro de Ouros",

  // Damas
  "Queen of Wands": "Rainha de Paus",
  "Queen of Cups": "Rainha de Copas",
  "Queen of Swords": "Rainha de Espadas",
  "Queen of Pentacles": "Rainha de Ouros",

  // Reis
  "King of Wands": "Rei de Paus",
  "King of Cups": "Rei de Copas",
  "King of Swords": "Rei de Espadas",
  "King of Pentacles": "Rei de Ouros",

  // Ases
  "Ace of Wands": "Ás de Paus",
  "Ace of Cups": "Ás de Copas",
  "Ace of Swords": "Ás de Espadas",
  "Ace of Pentacles": "Ás de Ouros",

  // 2 a 10 de cada naipe
  "Two of Wands": "Dois de Paus", "Three of Wands": "Três de Paus", "Four of Wands": "Quatro de Paus",
  "Five of Wands": "Cinco de Paus", "Six of Wands": "Seis de Paus", "Seven of Wands": "Sete de Paus",
  "Eight of Wands": "Oito de Paus", "Nine of Wands": "Nove de Paus", "Ten of Wands": "Dez de Paus",

  "Two of Cups": "Dois de Copas", "Three of Cups": "Três de Copas", "Four of Cups": "Quatro de Copas",
  "Five of Cups": "Cinco de Copas", "Six of Cups": "Seis de Copas", "Seven of Cups": "Sete de Copas",
  "Eight of Cups": "Oito de Copas", "Nine of Cups": "Nove de Copas", "Ten of Cups": "Dez de Copas",

  "Two of Swords": "Dois de Espadas", "Three of Swords": "Três de Espadas", "Four of Swords": "Quatro de Espadas",
  "Five of Swords": "Cinco de Espadas", "Six of Swords": "Seis de Espadas", "Seven of Swords": "Sete de Espadas",
  "Eight of Swords": "Oito de Espadas", "Nine of Swords": "Nove de Espadas", "Ten of Swords": "Dez de Espadas",

  "Two of Pentacles": "Dois de Ouros", "Three of Pentacles": "Três de Ouros", "Four of Pentacles": "Quatro de Ouros",
  "Five of Pentacles": "Cinco de Ouros", "Six of Pentacles": "Seis de Ouros", "Seven of Pentacles": "Sete de Ouros",
  "Eight of Pentacles": "Oito de Ouros", "Nine of Pentacles": "Nove de Ouros", "Ten of Pentacles": "Dez de Ouros",
};

// Normaliza o mapa com as chaves padronizadas
const mapaNormalizado = Object.fromEntries(
  Object.entries(nomesPTporEN).map(([en, pt]) => [normalizar(en), pt])
);

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
      const nomeNormalizado = normalizar(nomeOriginal);
      const nomePT = mapaNormalizado[nomeNormalizado] || null;
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
        nome: nomePT || carta.name,
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
    const nomePT = mapaNormalizado[normalizar(nomeOriginal)] || null;
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
      nome: nomePT || carta.name,
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
