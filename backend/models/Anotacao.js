const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); 
const Referencia = require('./Referencia');
const User = require('./Usuario');
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

// Relacionamento
Anotacao.belongsTo(Referencia, {
  foreignKey: 'referencia_id',
  as: 'referencia'
});

// Relacionamento com Usuario
Anotacao.belongsTo(User, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

// Relacionamento com Trilha
Anotacao.belongsTo(Trilha, {
  foreignKey: 'trilha_id',
  as: 'trilha'
});

module.exports = Anotacao;

