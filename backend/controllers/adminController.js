const Admin = require('../models/admin');

exports.manageCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const admin = await Admin.findById(req.params.adminId);

    if (!admin) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }

    const newCourse = await admin.manageCourse(courseData);

    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error('Error managing course:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.manageUsers = async (req, res) => {
  try {
    const { userData } = req.body;
    const admin = await Admin.findById(req.params.adminId);

    if (!admin) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }

    const newUser = await admin.manageUsers(userData);

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error('Error managing users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
