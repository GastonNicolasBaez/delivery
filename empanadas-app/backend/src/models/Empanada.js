const { Model, DataTypes } = require('sequelize');

class Empanada extends Model {
  static schema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gusto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cantidadEnStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    esEspecial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 }
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  };

  static init(schema, options) {
    super.init(schema, options);
  }
}

module.exports = Empanada; 