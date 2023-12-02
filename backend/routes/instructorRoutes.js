const express = require('express');
const instructorController = require('../controllers/instructorController');

const instructorRouter = express.Router();

instructorRouter.route('/')
  .post(instructorController.createInstructor)
  .get(instructorController.getInstructors);

instructorRouter.route('/:_id')
  .get(instructorController.getInstructorById)
  .put(instructorController.updateInstructor)
  .delete(instructorController.deleteInstructor);

module.exports = instructorRouter;
