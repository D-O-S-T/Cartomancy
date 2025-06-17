const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {                     // <- aqui abriu chaves
    type: DataTypes.STRING,
    allowNull: true,
  },                          // <- fechou chaves
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trilha_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'trilhas',       // geralmente o nome da tabela é minúsculo
      key: 'id',
    },
  },
}, {                         // <- **Aqui abre um novo objeto para as opções**
  tableName: 'videos',        // <- **Aqui vai a opção tableName**
  timestamps: false,          // <- **E timestamps**
});

module.exports = Video;