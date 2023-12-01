const mongoose = require('mongoose');
const Course = require('../models/course');

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
        type: mongoose.Schema.Types.ObjectId, ref: Course
    }
})

const content = mongoose.model('content', contentSchema);
module.exports = content;
