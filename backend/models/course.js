const mongoose = require('mongoose');
const User = require('../models/user');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: false,
    match: /\.(jpg|jpeg|png|gif|webp)$/
  },
  content: [{
    contentType: {
      type: String,
      required: true
    },
    contentData: {
      type: String,
      required: true
    }
  }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
