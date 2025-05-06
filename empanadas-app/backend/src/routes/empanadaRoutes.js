const express = require('express');
const router = express.Router();
const empanadaController = require('../controllers/empanadaController');

// Rutas para empanadas
router.get('/', empanadaController.getAllEmpanadas);
router.get('/:id', empanadaController.getEmpanadaById);
router.post('/', empanadaController.createEmpanada);
router.put('/:id', empanadaController.updateEmpanada);
router.delete('/:id', empanadaController.deleteEmpanada);

// Ruta para subir imagen
router.post('/:id/imagen', empanadaController.uploadImage);

module.exports = router; 