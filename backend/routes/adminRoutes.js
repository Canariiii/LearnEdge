// En tu archivo de rutas o controladores
const express = require('express');
const router = express.Router();
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');

// Ruta protegida
router.get('/admin/users', authenticateUser, isAdmin, (req, res) => {
  // Lógica para obtener y enviar los usuarios
  res.send('Lista de usuarios administradores');
});

module.exports = router;
