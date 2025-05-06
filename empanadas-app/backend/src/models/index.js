const { Sequelize } = require('sequelize');
const config = require('../config/database');
const Empanada = require('./Empanada');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false
  }
);

// Inicializar el modelo
Empanada.init(Empanada.schema, {
  sequelize,
  modelName: 'Empanada'
});

module.exports = {
  sequelize,
  Empanada
}; 