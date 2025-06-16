const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Video = sequelize.define('Pdf', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trilha_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'videos',
  timestamps: false,
});

module.exports = Video;