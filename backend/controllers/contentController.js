const mongoose = require('mongoose');
const Content = require('../models/content');
const Course = require('../models/course');

exports.createContent = async (req, res) => {
  try {
    const { contentType, contentData, courseId } = req.body;
    const newContent = new Content({ contentType, contentData, associatedCourse: courseId });
    const savedContent = await newContent.save(); // Guarda el contenido y obtén el objeto guardado
    // Ahora actualiza el curso con el ID del contenido guardado
    await Course.findByIdAndUpdate(courseId, { $push: { contents: savedContent._id } });

    const contentId = savedContent._id;
    res.status(201).json({ success: true, data: { newContent, contentId } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getContentAll = async (req, res) => {
  try {
    const contents = await Content.find().populate('associatedCourse');
    res.status(200).json({ success: true, data: contents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getContentByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const contents = await Content.find({ associatedCourse: courseId });
    res.status(200).json({ success: true, data: contents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateOrAddContent = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { contentType, contentData } = req.body;

    // Busca si hay contenido asociado a este curso
    const existingContent = await Content.findOne({ associatedCourse: courseId });

    if (existingContent) {
      // Si existe, actualiza el contenido existente
      const updatedContent = await Content.findByIdAndUpdate(
        existingContent._id,
        { contentType, contentData },
        { new: true, runValidators: true }
      );
      res.status(200).json({ success: true, data: updatedContent });
    } else {
      // Si no existe, crea un nuevo contenido y lo asocia al curso
      const newContentResponse = await exports.createContent({ contentType, contentData, courseId });
      res.status(201).json(newContentResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const contentId = req.params.contentId;
    const deletedContent = await Content.findByIdAndDelete(contentId);
    if (!deletedContent) {
      return res.status(404).json({ success: false, error: 'Content not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
