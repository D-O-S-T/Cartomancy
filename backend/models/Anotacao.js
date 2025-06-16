const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); 
const Referencia = require('./Referencia');
const Usuario = require('./Usuario');
const Trilha = require('./Trilha');


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
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  referencia_id: {
    type: DataTypes.INTEGER,
     allowNull: true,
    references: {
      model: 'referencias',
      key: 'id'
    },
  }
}, {
  tableName: 'anotacoes',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = Anotacao;

