const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Pdf = sequelize.define('Pdf', {  // nome correto do model
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trilha_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'pdf',
  timestamps: false,
});

module.exports = Pdf;  // exporte com o nome correto
