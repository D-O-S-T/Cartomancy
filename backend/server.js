require('dotenv').config();
const app = require('./app');
const { conectarDB } = require('./models/db');
const importarCartas = require('./utils/importarCartas'); // ajuste o caminho se necessário

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await conectarDB(); // mantém sua conexão ativa

  await importarCartas(); // importa as cartas ao subir o servidor

  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
