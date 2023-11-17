const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../multer/upload');

const userRouter = express.Router();

// Login route
userRouter.post('/login', userController.login);

// Routes for users
userRouter.route('/')
  .post(upload.single('file'), userController.createUser)
  .get(userController.getUsers);

// Update the route for user details, for example, using /profile instead of /:_id
userRouter.route('/profile')
  .get(userController.getUserById)
  .put(upload.single('file'), userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
