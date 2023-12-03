// adminModel.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({});

adminSchema.methods.manageCourse = async function (courseData) {
  const newCourse = await Course.create(courseData);
  return newCourse;
};

adminSchema.methods.manageUsers = async function (userData) {
  const newUser = await User.create(userData);
  return newUser;
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
