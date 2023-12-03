const express = require('express');
const courseController = require('../controllers/courseController');
const authorizeInstructor = require('../middleware/authorizeInstructor');

const courseRouter = express.Router();

courseRouter.route('/')
  .post(authorizeInstructor, courseController.createCourse)
  .get(courseController.getCourses);

courseRouter.route('/:_id')
  .put(authorizeInstructor, courseController.updateCourse)
  .delete(authorizeInstructor, courseController.deleteCourse);


module.exports = courseRouter;
