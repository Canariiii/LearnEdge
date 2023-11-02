var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

router.route('/')
    .post(userController.postUser)
    .get(userController.getUsers);

router.route('/:user_id')
    .get(userController.getUser)
    .put(userController.putUser)
    .delete(userController.deleteUser);

module.exports = router;
