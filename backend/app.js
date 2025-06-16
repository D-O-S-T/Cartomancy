const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/usuarioRoutes');
const swaggerSetup = require('./config/swagger');
const trilhaRoutes = require('./routes/trilhaRoutes');
const anotacaoRoutes = require('./routes/anotacaoRoutes');
const cartaRoutes = require('./routes/cartaRoutes');
const videoRoutes = require('./routes/videoRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const materiaisRoutes = require('./routes/materiaisRoutes');

const app = express();

// ⬇️ middlewares primeiro
app.use(cors());
app.use(express.json());

// ⬇️ depois, as rotas
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/anotacoes', anotacaoRoutes);
app.use('/api/cartas', cartaRoutes);
app.use('/videos', videoRoutes);
app.use('/pdfs', pdfRoutes);
app.use('/materiais', materiaisRoutes);

// Swagger
swaggerSetup(app);

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão para servir o index.html (opcional, mas recomendado)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'teste-api.html'));
});

module.exports = app;