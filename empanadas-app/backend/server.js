const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./src/models');
const empanadaRoutes = require('./src/routes/empanadaRoutes');
const empanadasSeed = require('./src/seeders/empanadasSeed');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Servir archivos estáticos desde el directorio uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/empanadas', empanadaRoutes);

// Sincronizar la base de datos y iniciar el servidor
sequelize.sync({ force: true })
  .then(async () => {
    console.log('Base de datos sincronizada');
    await empanadasSeed();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  }); 