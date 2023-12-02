const mongoose = require('mongoose');
const Course = require('../models/course');


const studentSchema = new mongoose.Schema({
  joinedCourses: [{
    type: mongoose.Schema.Types.ObjectId, ref: Course
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };
