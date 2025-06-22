const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require("axios");
const db = require('./models');

const usuarioRoutes = require('./routes/usuarioRoutes');
const swaggerSetup = require('./config/swagger');
const trilhaRoutes = require('./routes/trilhaRoutes');
const anotacaoRoutes = require('./routes/anotacaoRoutes');
const cartaRoutes = require('./routes/cartaRoutes');
const videoRoutes = require('./routes/videoRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const materiaisRoutes = require('./routes/materiaisRoutes');

const app = express();

// ⬇️ middlewares
app.use(cors());
app.use(express.json());

// ⬇️ rotas da API
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/anotacoes', anotacaoRoutes);
app.use('/api/cartas', cartaRoutes);
app.use('/api/videos', videoRoutes);
app.use('/pdfs', pdfRoutes);
app.use('/materiais', materiaisRoutes);

// ⬇️ rota proxy de imagens
app.get("/imagens/:nome", async (req, res) => {
  const { nome } = req.params;
  try {
    const response = await axios.get(`http://data.totl.net/tarot-rwcs-images/${nome}`, {
      responseType: "arraybuffer",
    });

    res.set("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    console.error("Erro ao buscar imagem:", error.message);
    res.status(500).send("Erro ao buscar imagem.");
  }
});

// ⬇️ Swagger
swaggerSetup(app);

// ⬇️ arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ⬇️ rotas de páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagInicial.html'));
});

app.get('/crudAdmin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crudAdmin.html'));
});

app.get('/crud', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crud.html'));
});

module.exports = app;
