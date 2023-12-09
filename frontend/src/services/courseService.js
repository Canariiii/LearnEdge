import axios from 'axios';

const API_URL = 'http://localhost:3001/courses';

const createCourse = async (title, description, file, instructor) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("instructor", instructor);

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating course", error);
    throw error;
  }
};

const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting courses", error);
    throw error;
  }
};

const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting course with ID ${courseId}`, error);
    throw error;
  }
};

const updateCourse = async (courseId, userId) => {
  try {
    const response = await axios.put(`${API_URL}/${courseId}`, { userId });
    return response.data;
  } catch (error) {
    console.error(`Error updating course with ID ${courseId}`, error);
    throw error;
  }
};

const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${API_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting course with ID ${courseId}`, error);
    throw error;
  }
};

export {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};