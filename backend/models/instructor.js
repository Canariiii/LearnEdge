const mongoose = require('mongoose');
const Course = require('../models/course');

const instructorSchema = new mongoose.Schema({
    coursesTaught: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    }],
    currentCourses: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    }]
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
