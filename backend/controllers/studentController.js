const mongoose = require('mongoose');
const Course = require('../models/course');
const { Student } = require('../models/student');

exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('joinedCourses');
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params._id).populate('joinedCourses');
    if (!student) {
      return res.status(404).json({ success: false, error: 'Estudiante no encontrado' });
    }

    if (student.role !== 'student') {
      return res.status(403).json({ success: false, error: 'Acceso denegado. No eres un estudiante.' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = req.body;
    const student = await Student.findByIdAndUpdate(req.params._id, updatedStudent, {
      new: true,
      runValidators: true,
    }).populate('joinedCourses');
    if (!student) {
      return res.status(404).json({ success: false, error: 'Estudiante no encontrado' });
    }

    if (student.role !== 'student') {
      return res.status(403).json({ success: false, error: 'Acceso denegado. No eres un estudiante.' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params._id);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Estudiante no encontrado' });
    }

    if (student.role !== 'student') {
      return res.status(403).json({ success: false, error: 'Acceso denegado. No eres un estudiante.' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
