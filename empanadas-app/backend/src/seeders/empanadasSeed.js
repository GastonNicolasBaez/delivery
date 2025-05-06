const { Empanada } = require('../models');

const empanadasSeed = async () => {
  await Empanada.bulkCreate([
    {
      gusto: 'Carne',
      descripcion: 'Empanada tradicional de carne cortada a cuchillo',
      cantidadEnStock: 50,
      esEspecial: false,
      imagen: null,
      precio: 1200
    },
    {
      gusto: 'Jamón y Queso',
      descripcion: 'Empanada rellena de jamón y queso cremoso',
      cantidadEnStock: 40,
      esEspecial: false,
      imagen: null,
      precio: 1100
    },
    {
      gusto: 'Capresse',
      descripcion: 'Empanada de tomate, albahaca y mozzarella',
      cantidadEnStock: 30,
      esEspecial: true,
      imagen: null,
      precio: 1300
    }
  ]);
  console.log('Empanadas de ejemplo cargadas');
};

module.exports = empanadasSeed; 