const mongoose = require('mongoose');
const Students = require('./student');
const Instructor = require('./instructor');

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
    ref: Instructor
  },
  enrolledStudents: [{
   type: mongoose.Schema.Types.ObjectId,
    ref: Students
  }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
