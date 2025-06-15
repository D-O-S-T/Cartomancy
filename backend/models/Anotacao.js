const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); 

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
  }
}, {
  tableName: 'anotacoes',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = Anotacao;

