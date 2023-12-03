const mongoose = require('mongoose');
const Course = require('../models/course');
const Content = require('../models/content');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, filename, users, contentType, contentData } = req.body;

    // Crea el nuevo contenido
    const newContent = new Content({
      contentType,
      contentData,
    });
    await newContent.save();

    const instructorId = users.map(instructorId => mongoose.Types.ObjectId(instructorId));
    const userIds = users.map(userId => mongoose.Types.ObjectId(userId));

    // Crea el nuevo curso y asocia el contenido
    const newCourse = new Course({
      title,
      description,
      filename,
      instructor: instructorId,
      enrolledStudents: userIds,
      content: newContent._id,
    });
    await newCourse.save();

    // Actualiza el contenido con el curso asociado
    newContent.associatedCourse = newCourse._id;
    await newContent.save();

    // Devuelve la respuesta con ambos documentos
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

exports.updateStudents = async (req, res) => {
  try {
    const courseId = req.body.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    const { addStudents, removeStudents } = req.body;
    if (addStudents && addStudents.length > 0) {
      const addStudentIds = addStudents.map(studentId => mongoose.Types.ObjectId(studentId));
      course.enrolledStudents.push(...addStudentIds);
    }
    if (removeStudents && removeStudents.length > 0) {
      const removeStudentIds = removeStudents.map(studentId => mongoose.Types.ObjectId(studentId));
      course.enrolledStudents = course.enrolledStudents.filter(
        studentId => !removeStudentIds.includes(studentId)
      );
    }
    await course.save();
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    // Agrega la lógica para actualizar el instructor aquí
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
