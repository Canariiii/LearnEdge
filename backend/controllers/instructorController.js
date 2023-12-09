const Instructor = require('../models/instructor');
const User = require('../models/user');
const Course = require('../models/course');

exports.createInstructor = async (req, res) => {
  try {
    const newInstructor = new Instructor(req.body);
    newInstructor._id = req.body.user;
    await newInstructor.save();
    const courseId = req.body.courseId; 
    newInstructor.currentCourses.push(courseId);
    await newInstructor.save();
    const user = await User.findByIdAndUpdate(req.body.user, { $set: { role: 'instructor' } });
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

    if (instructor.role !== 'instructor') {
      return res.status(403).json({ success: false, error: 'Access denied. You are not an instructor.' });
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

    if (instructor.role !== 'instructor') {
      return res.status(403).json({ success: false, error: 'Access denied. You are not an instructor.' });
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

    if (instructor.role !== 'instructor') {
      return res.status(403).json({ success: false, error: 'Access denied. You are not an instructor.' });
    }

    // Eliminar referencia al instructor en el usuario
    await User.findByIdAndUpdate(instructor.user, { $unset: { role: 1 } });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting instructor:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
