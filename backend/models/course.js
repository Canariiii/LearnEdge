const mongoose = require('mongoose');
const Students = require('./student');
const Instructor = require('./instructor');
const Content = require('./content');

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  },
  enrolledStudents: [{
   type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
