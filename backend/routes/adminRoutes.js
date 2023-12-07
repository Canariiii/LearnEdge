// adminRoutes.js

const express = require('express');
const router = express.Router();
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.use(authenticateUser);

router.get('/admin/users', isAdmin, adminController.getAllUsers);
router.get('/admin/users/:userId', isAdmin, adminController.getUserById);
router.put('/admin/users/:adminId/:userId', isAdmin, adminController.updateUserById);
router.delete('/admin/users/:userId', isAdmin, adminController.deleteUserById);

module.exports = router;
