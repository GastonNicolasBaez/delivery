const { Sequelize } = require('sequelize');
const config = require('../config/database');
const Empanada = require('./Empanada');
const Pedido = require('./Pedido');
const PedidoEmpanada = require('./PedidoEmpanada');

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

// Inicializar modelos
Empanada.init(Empanada.schema, {
  sequelize,
  modelName: 'Empanada'
});
Pedido.init(Pedido.schema, {
  sequelize,
  modelName: 'Pedido'
});
PedidoEmpanada.init(PedidoEmpanada.schema, {
  sequelize,
  modelName: 'PedidoEmpanada'
});

// Relaciones
Pedido.belongsToMany(Empanada, { through: PedidoEmpanada, foreignKey: 'pedidoId' });
Empanada.belongsToMany(Pedido, { through: PedidoEmpanada, foreignKey: 'empanadaId' });
PedidoEmpanada.belongsTo(Pedido, { foreignKey: 'pedidoId' });
PedidoEmpanada.belongsTo(Empanada, { foreignKey: 'empanadaId' });

module.exports = {
  sequelize,
  Empanada,
  Pedido,
  PedidoEmpanada
}; 