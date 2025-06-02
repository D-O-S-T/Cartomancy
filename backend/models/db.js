// backend/models/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS.replace(/"/g, ''),
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

// função que testa a conexão
const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Conectado ao banco ${process.env.DB_NAME}!`);
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
  }
};

module.exports = {
  sequelize,
  conectarDB
};
