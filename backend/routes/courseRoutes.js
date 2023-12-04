const express = require('express');
const courseController = require('../controllers/courseController');

const courseRouter = express.Router();

courseRouter.route('/')
  .post( courseController.createCourse)
  .get(courseController.getCourses);

courseRouter.route('/:_id')
  .put( courseController.updateCourse)
  .delete( courseController.deleteCourse);


module.exports = courseRouter;
