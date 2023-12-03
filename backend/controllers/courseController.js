const mongoose = require('mongoose');
const Course = require('../models/course');
const Content = require('../models/content');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, filename, users, contentType, contentData } = req.body;
    const file = req.file;
    const newContent = new Content({
      contentType,
      contentData,
    });
    await newContent.save();
    const instructorId = users.map(instructorId => mongoose.Types.ObjectId(instructorId));
    const userIds = users.map(userId => mongoose.Types.ObjectId(userId));
    const newCourse = new Course({
      title,
      description,
      filename,
      instructor: instructorId,
      enrolledStudents: userIds,
      content: newContent._id,
      file: file ? file.filename : null,
    });
    await newCourse.save();
    newContent.associatedCourse = newCourse._id;
    await newContent.save();
    res.status(201).json({
      success: true,
      data: {
        newCourse,
        newContent,
      },
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

// Aplica el middleware de autorización a las rutas relevantes
exports.updateCourse = async (req, res) => {
  try {
    if (!req.body || !req.body.users || !Array.isArray(req.body.users)) {
      return res.status(400).json({ success: false, error: "Invalid request format" });
    }

    const userIds = req.body.users.map(userId => mongoose.Types.ObjectId(userId));
    const course = await Course.findByIdAndUpdate(
      req.params._id,
      { $addToSet: { enrolledStudents: { $each: userIds } } },
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

// Aplica el middleware de autorización a las rutas relevantes
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