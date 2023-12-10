const mongoose = require('mongoose');
const Course = require('../models/course');
const Content = require('../models/content');
const Instructor = require('../models/instructor');
const contentController = require('./contentController');

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
    console.log(courses);  
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate({
      path: 'content',
      model: 'Content',
    });

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
    const courseId = req.params.courseId;
    const { title, description, content } = req.body;
    let contentId;
    if (content) {
      const contentData = {
        contentType: 'file',
        contentData: content.contentData,
      };
      if (content.contentId) {
        console.log('contentId: ', contentId)
        const updatedContent = await Content.findByIdAndUpdate(content.contentId, contentData, { new: true });
        contentId = updatedContent._id;
      } else {
        const newContent = new Content(contentData);
        await newContent.save();
        contentId = newContent._id;
      }
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true }
    ).populate('content');
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateCourseById = async (req, res) => {
  try {
    const { title, description } = req.body;
    const contentFile = req.file;
    const courseId = req.params.courseId;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    if (contentFile) {
      const contentResponse = await contentController.updateOrAddContent({
        contentType: 'file',  
        contentData: req.file.filename,
        courseId: updatedCourse._id,
      });

      console.log('Content updated or added:', contentResponse);

      // Aquí actualiza el campo 'content' como un array
      updatedCourse.content.push(contentResponse.data.contentId);

      // Guarda el curso actualizado
      await updatedCourse.save();
    }

    res.status(200).json({ success: true, data: updatedCourse });
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