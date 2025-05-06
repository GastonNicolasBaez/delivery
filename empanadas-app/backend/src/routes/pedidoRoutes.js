const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Ruta para crear un pedido
router.post('/', pedidoController.crearPedido);

// Ruta para obtener todos los pedidos
router.get('/', pedidoController.listarPedidos);

// Ruta para actualizar el estado de un pedido
router.put('/:id/estado', pedidoController.actualizarEstado);

module.exports = router; 