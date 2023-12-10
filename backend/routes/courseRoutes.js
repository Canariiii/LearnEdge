const express = require('express');
const courseController = require('../controllers/courseController');
const upload = require('../multer/upload');

const courseRouter = express.Router();

courseRouter.route('/')
  .post(upload.single('file'), courseController.createCourse)
  .get(courseController.getCourses);

courseRouter.route('/:courseId')
  .get(courseController.getCourseById)
  .put(courseController.updateCourseById)
  .delete(courseController.deleteCourse); 

courseRouter.route('/update/:courseId')
  .put(upload.single('file'), courseController.updateCourseById);

module.exports = courseRouter;
