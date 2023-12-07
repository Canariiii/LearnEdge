const Admin = require('../models/admin');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    
    console.log('PUT route:', '/admin/users/:adminId/:userId');
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);

    const { userData } = req.body;
    const admin = await Admin.findById(req.params.adminId);
    console.log('Received PUT request for adminId:', req.params.adminId, 'userId:', req.params.userId);
    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Permission denied' });
    }
    if (req.params.adminId !== userData.adminId) {
      return res.status(403).json({ success: false, error: 'Permission denied - Admin IDs do not match' });
    }
    const user = await User.findByIdAndUpdate(req.params.userId, userData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
    
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.deleteUserById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId);
    if (!admin) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }

    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


