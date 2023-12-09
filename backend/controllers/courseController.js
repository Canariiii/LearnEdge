const mongoose = require('mongoose');
const Course = require('../models/course');
const Content = require('../models/content');

exports.createCourse = async (req, res) => {
  try {
    console.log(req.body);  
    const { title, description, instructor } = req.body;
    const { filename } = req.file;

    const newCourse = new Course({
      title,
      description,
      filename,
      instructor, 
    });
    await newCourse.save();
    res.status(201).json({
      success: true,
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('enrolledStudents');
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params._id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    if (!req.body || !req.body.userId) {
      return res.status(400).json({ success: false, error: "Invalid request format" });
    }
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const course = await Course.findByIdAndUpdate(
      req.params._id,
      { $addToSet: { enrolledStudents: userId } },
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params._id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};