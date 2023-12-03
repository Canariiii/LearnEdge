const express = require('express');
const contentRouter = express.Router();
const contentController = require('../controllers/contentController');

contentRouter.route("/")
  .post(contentController.createContent)
  .get(contentController.getContentAll)

// Ruta para obtener contenido por curso
contentRouter.get('/content/:courseId', contentController.getContentByCourse);

// Ruta para actualizar contenido por su ID
contentRouter.put('/:contentId', contentController.updateContent);

// Ruta para eliminar contenido por su ID
contentRouter.delete('/:contentId', contentController.deleteContent);

module.exports = contentRouter;
