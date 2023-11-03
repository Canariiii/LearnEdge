const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/courseController');

courseRouter.route("/")
  .post(courseController.createCourse)
  .get(courseController.getCourses);

courseRouter.route("/:_id")
  .get(courseController.getCourseById)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = courseRouter;