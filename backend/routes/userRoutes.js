const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../multer/upload');

const userRouter = express.Router();

// Login route
userRouter.post('/login', userController.login);

// Routes for users
userRouter.route('/')
  .post(upload.single('filename'), userController.createUser)
  .get(userController.getUsers);

userRouter.route('/profile')
  .get(userController.getUserById)
  .put(upload.single('filename'), userController.updateUser);

userRouter.route('/:_id')
  .delete(userController.deleteUser);
module.exports = userRouter;
