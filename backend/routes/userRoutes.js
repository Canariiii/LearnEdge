const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.route('/')
  .post(userController.createUser)
  .get(userController.getUsers);

userRouter.route('/:_id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
