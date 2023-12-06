const express = require('express');
const router = express.Router();
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.use(authenticateUser);

router.get('/users', isAdmin, adminController.getAllUsers);
router.get('/users/:userId', isAdmin, adminController.getUserById);
router.put('/admin/users/:adminId/:userId', isAdmin, adminController.updateUserById);
router.delete('/users/:adminId/:userId', isAdmin, adminController.deleteUserById);

module.exports = router;
