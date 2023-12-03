const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
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
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true 
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
