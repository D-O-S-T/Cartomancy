const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); 
const Referencia = require('./Referencias');

const Anotacao = sequelize.define('Anotacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trilha_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  referencia_id: {  // Substituindo material_id
    type: DataTypes.INTEGER,
    allowNull: true  // Porque algumas anotações podem ser soltas
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  referencia_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'referencias',
      key: 'id'
    },
  allowNull: false
  }
}, {
  tableName: 'anotacoes',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = Anotacao;

