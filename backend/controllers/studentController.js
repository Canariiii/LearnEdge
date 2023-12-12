const  Student  = require('../models/student');
const Course = require('../models/course');

exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    const allCourses = await Course.find(); 
    const courseList = allCourses.map(course => ({
      title: course.title,
      filename: course.filename
    }));
    res.status(201).json({ success: true, data: { newStudent: { ...newStudent.toObject(), courseList } } });
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json({ success: true, data: allCourses });
  } catch (error) {
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
    const studentId = req.params._id;

    const student = await Student.findByIdAndUpdate(studentId, updatedStudent, {
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
