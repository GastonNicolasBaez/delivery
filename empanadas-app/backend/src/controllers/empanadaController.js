const { Empanada } = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp|svg|bmp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp, svg, bmp)'));
  },
  limits: {
    fileSize: 30 * 1024 * 1024 // 30MB
  }
}).single('imagen');

// Obtener todas las empanadas
exports.getAllEmpanadas = async (req, res) => {
  try {
    const empanadas = await Empanada.findAll();
    res.json(empanadas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una empanada por ID
exports.getEmpanadaById = async (req, res) => {
  try {
    const empanada = await Empanada.findByPk(req.params.id);
    if (!empanada) {
      return res.status(404).json({ message: 'Empanada no encontrada' });
    }
    res.json(empanada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva empanada
exports.createEmpanada = async (req, res) => {
  try {
    const empanada = await Empanada.create(req.body);
    res.status(201).json(empanada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una empanada
exports.updateEmpanada = async (req, res) => {
  try {
    const empanada = await Empanada.findByPk(req.params.id);
    if (!empanada) {
      return res.status(404).json({ message: 'Empanada no encontrada' });
    }
    await empanada.update(req.body);
    res.json(empanada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una empanada
exports.deleteEmpanada = async (req, res) => {
  try {
    const empanada = await Empanada.findByPk(req.params.id);
    if (!empanada) {
      return res.status(404).json({ message: 'Empanada no encontrada' });
    }
    await empanada.destroy();
    res.json({ message: 'Empanada eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Subir imagen de empanada
exports.uploadImage = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }

    try {
      const empanada = await Empanada.findByPk(req.params.id);
      if (!empanada) {
        // Si no existe la empanada, eliminamos la imagen subida
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: 'Empanada no encontrada' });
      }

      // Si la empanada ya tiene una imagen, eliminamos la anterior
      if (empanada.imagen) {
        const oldImagePath = path.join(__dirname, '../../uploads', path.basename(empanada.imagen));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Actualizamos la ruta de la imagen en la base de datos
      const imageUrl = `/uploads/${req.file.filename}`;
      await empanada.update({ imagen: imageUrl });

      res.json({ imagen: imageUrl });
    } catch (error) {
      // Si hay un error, eliminamos la imagen subida
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ message: error.message });
    }
  });
}; 