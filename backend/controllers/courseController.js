const mongoose = require('mongoose');
const Course = require('../models/course');
const Content = require('../models/content');
const Instructor = require('../models/instructor');

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { filename } = req.file;
    const instructorUserId = req.body.instructor;
    const instructor = await Instructor.findOne({ user: instructorUserId });
    if (!instructor) {
      return res.status(404).json({ success: false, error: 'Instructor not found' });
    }
    const newCourse = new Course({
      title,
      description,
      filename,
      instructor: instructor.user,
    });
    await newCourse.save();
    instructor.currentCourses.push(newCourse._id);
    await instructor.save();
    res.status(201).json({ success: true, data: { course: newCourse._id } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(['enrolledStudents', 'instructor']);
    console.log(courses);  // Agrega este log para depuración
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