require('dotenv').config();
const app = require('./app');
const { conectarDB } = require('./models/db');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await conectarDB(); // isso mantém sua conexão ativa 💙
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
