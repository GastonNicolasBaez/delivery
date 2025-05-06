const { Pedido, Empanada, PedidoEmpanada, sequelize } = require('../models');

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      nombre,
      telefono,
      email,
      direccion,
      sucursal,
      pisoDepto,
      notas,
      tipo,
      metodoPago,
      estado,
      empanadas // Array de objetos: [{ id, cantidad, precio }]
    } = req.body;

    // Crear el pedido
    const pedido = await Pedido.create({
      nombre,
      telefono,
      email,
      direccion,
      sucursal,
      pisoDepto,
      notas,
      tipo,
      metodoPago,
      estado: estado || 'pendiente'
    }, { transaction: t });

    // Asociar empanadas al pedido
    for (const item of empanadas) {
      await PedidoEmpanada.create({
        pedidoId: pedido.id,
        empanadaId: item.id,
        cantidad: item.cantidad,
        precio: item.precio
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Pedido creado correctamente', pedidoId: pedido.id });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

// Obtener todos los pedidos con sus empanadas
exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Empanada,
          through: {
            attributes: ['cantidad', 'precio']
          }
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

// Actualizar el estado de un pedido
exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    pedido.estado = estado;
    await pedido.save();
    res.json({ message: 'Estado actualizado', pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
}; 