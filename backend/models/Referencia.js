const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Referencia = sequelize.define('Referencia', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipo_material: {
    type: DataTypes.STRING,
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
