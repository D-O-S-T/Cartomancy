const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); // 🔥 CORRETO

const Anotacao = sequelize.define('trilhas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  }, 
  trilha_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  material_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
    tableName: 'anotacoes',
    timestamps: true,
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

module.exports = Anotacao;