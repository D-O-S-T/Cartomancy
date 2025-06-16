const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Referencia = sequelize.define('Referencia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_material: {
    type: DataTypes.ENUM('carta', 'video', 'pdf', 'link'),
    // Você pode adicionar mais tipos no futuro, se necessário
  },
  material_id: {
    type: DataTypes.INTEGER,
    // Esse campo pode ser usado como chave estrangeira em código, sem obrigatoriedade aqui
  }
}, {
  tableName: 'referencias',
  timestamps: false
});

module.exports = Referencia;
