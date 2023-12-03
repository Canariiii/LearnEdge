const mongoose = require('mongoose');
const Content = require('../models/content');
const Course = require('../models/course');

exports.createContent = async ({ contentType, contentData }) => {
  try {
    const newContent = new Content({ contentType, contentData });
    await newContent.save();
    const contentId = newContent._id;
    return { success: true, data: { newContent, contentId } };
  } catch (error) {
    return { success: false, error: error.message };
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

exports.updateContent = async (req, res) => {
  try {
      const contentId = req.params.contentId;
      const { contentType, contentData } = req.body;
      const updatedContent = await Content.findByIdAndUpdate(
          contentId,
          { contentType, contentData },
          { new: true, runValidators: true }
      );

      if (!updatedContent) {
          return res.status(404).json({ success: false, error: 'Content not found' });
      }
      res.status(200).json({ success: true, data: updatedContent });
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
