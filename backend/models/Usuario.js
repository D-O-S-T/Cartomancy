const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipo_usuario: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
