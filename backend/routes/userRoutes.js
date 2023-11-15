const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const upload = require('../multer/upload');

userRouter.route('/')
  .post(upload.single('file'), userController.createUser)
  .get(userController.getUsers);

userRouter.route('/:_id')
  .get(userController.getUserById)
  .put(upload.single('file'), userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
