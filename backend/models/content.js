const mongoose = require('mongoose');
const Course = require('./course');

const contentSchema = new mongoose.Schema({
  contentType: {
    type: String,
    required: true
  },
  contentData: {
    type: String,
    required: true
  },
  associatedCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }
});

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
