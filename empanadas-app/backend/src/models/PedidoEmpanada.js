const { Model, DataTypes } = require('sequelize');

class PedidoEmpanada extends Model {
  static schema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  };

  static init(schema, options) {
    super.init(schema, options);
  }
}

module.exports = PedidoEmpanada; 