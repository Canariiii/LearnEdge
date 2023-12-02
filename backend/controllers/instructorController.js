const Instructor = require('../models/instructorModel');
const Course = require('../models/courseModel');

exports.createInstructor = async (req, res) => {
  try {
    const newInstructor = new Instructor(req.body);
    await newInstructor.save();
    res.status(201).json({ success: true, data: newInstructor });
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().populate(['coursesTaught', 'currentCourses']);
    res.status(200).json({ success: true, data: instructors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params._id).populate(['coursesTaught', 'currentCourses']);
    if (!instructor) {
      return res.status(404).json({ success: false, error: 'Instructor not found' });
    }
    res.status(200).json({ success: true, data: instructor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    const updatedInstructor = req.body;
    const instructor = await Instructor.findByIdAndUpdate(req.params._id, updatedInstructor, {
      new: true,
      runValidators: true,
    }).populate(['coursesTaught', 'currentCourses']);
    if (!instructor) {
      return res.status(404).json({ success: false, error: 'Instructor not found' });
    }
    res.status(200).json({ success: true, data: instructor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params._id);
    if (!instructor) {
      return res.status(404).json({ success: false, error: 'Instructor not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting instructor:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
