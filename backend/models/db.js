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

// função que testa a conexão e sincroniza as tabelas
const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conectado ao banco ${process.env.DB_NAME}!`);

    // Sincroniza as tabelas (cria/atualiza conforme os models)
    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar o banco:', error);
    process.exit(1); // opcional: encerra a app se der erro grave
  }
};

module.exports = {
  sequelize,
  conectarDB
};
