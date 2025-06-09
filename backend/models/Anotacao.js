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
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  atualizado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
    tableName: 'anotacoes',
    timestamps: false // desabilita createdAt/updatedAt automáticos
});

module.exports = Anotacao;