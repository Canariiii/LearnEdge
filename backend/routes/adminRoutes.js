const express = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = express.Router();

adminRouter.route('/:_id/manage-course').post(adminController.manageCourse);
adminRouter.route('/:_id/manage-users').post(adminController.manageUsers);

module.exports = adminRouter;
