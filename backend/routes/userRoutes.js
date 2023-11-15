const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const upload = require('../multer/upload');
const auth = require('../controllers/auth');  

userRouter.route('/')
  .post(upload.single('file'), auth.isAuthenticated, userController.createUser) 
  .get(auth.isAuthenticated, userController.getUsers);

userRouter.route('/:_id')
  .get(auth.isAuthenticated, userController.getUserById)
  .put(upload.single('file'), auth.isAuthenticated, userController.updateUser)
  .delete(auth.isAuthenticated, userController.deleteUser);

module.exports = userRouter;
