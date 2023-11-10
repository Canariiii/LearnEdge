const express = require('express');
const userRouter = express.Router();
var userController = require('../controllers/userController');
var upload = require('../multer/upload');

userRouter.route('/')
  .post(upload.single('file'), userController.createUser)
  .get(userController.getUsers);

userRouter.route('/:_id')
  .get(userController.getUserById)
  .put(upload.single('file'), userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
