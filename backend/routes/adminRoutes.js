const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);
router.get('/users/:_id', adminController.getUserById);
router.put('/users/:_id', adminController.updateUserById);
router.delete('/users/:_id', adminController.deleteUserById);

module.exports = router;
