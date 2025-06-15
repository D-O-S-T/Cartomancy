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
    allowNull: false
  },
  material_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'referencias',
  timestamps: false
});

module.exports = Referencia;