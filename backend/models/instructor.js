const mongoose = require('mongoose');
const Course = require('../models/course');

const instructorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must have 8 characters']
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Not valid email'
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{9}$/.test(value);
      },
      message: 'Not valid phone'
    }
  },
  role: {
    type: String,
    required: true,
    default: 'student',
    enum: ['student', 'instructor', 'admin'],
  },
  filename: {
    type: String,
    required: false,
    match: /\.(jpg|jpeg|png|gif|webp)$/
  },
  coursesTaught: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Course'
  }],
  currentCourses: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Course'
  }]
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
