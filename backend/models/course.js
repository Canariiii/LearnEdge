const mongoose = require('mongoose');
const User = require('./user'); 
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
  instructor: {
    type: Schema.Types.ObjectId,
    ref: Instructor, 
    required: true
  },
  enrolledUsers: [{
    type: Schema.Types.ObjectId,
    ref: User
  }]
})

const course = mongoose.model('course', courseSchema);
module.exports = course;