const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); // 🔥 CORRETO

const Trilha = sequelize.define('trilhas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'trilhas',
  timestamps: false
});

module.exports = Trilha;
