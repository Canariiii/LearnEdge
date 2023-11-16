const express = require('express');
const studentRouter = express.Router();
const studentController = require('../controllers/studentController');

studentRouter.route('/')
  .post(studentController.createStudent)
  .get(studentController.getStudents);

studentRouter.route('/:_id')
  .get(studentController.getStudentById)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = studentRouter;