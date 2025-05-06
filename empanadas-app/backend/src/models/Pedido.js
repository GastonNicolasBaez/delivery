const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
  static schema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sucursal: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pisoDepto: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo: {
      type: DataTypes.ENUM('delivery', 'pickup'),
      allowNull: false
    },
    metodoPago: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  };

  static init(schema, options) {
    super.init(schema, options);
  }
}

module.exports = Pedido; 