const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }]
})

const course = mongoose.model('course', courseSchema);
module.exports = course;