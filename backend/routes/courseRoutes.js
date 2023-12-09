const express = require('express');
const courseController = require('../controllers/courseController');

const courseRouter = express.Router();
const upload = require('../multer/upload');


courseRouter.route('/')
  .post(upload.single('file'), courseController.createCourse)
  .get(courseController.getCourses);

courseRouter.route('/:_id')
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = courseRouter;
