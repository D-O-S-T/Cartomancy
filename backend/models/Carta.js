const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); // ou onde estiver sua instância

const Carta = sequelize.define('Carta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_short: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  meaning_up: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  meaning_rev: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  trilha_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'cartas',
  timestamps: false,
});

module.exports = Carta;

