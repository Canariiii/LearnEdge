const mongoose = require('mongoose');
const Course = require('../models/course');

const instructorSchema = new mongoose.Schema({
    coursesTaught: [{
        type: mongoose.Schema.Types.ObjectId, ref: Course
    }]
})
const instructor = mongoose.model('instructor', instructorSchema);
module.exports = instructor;