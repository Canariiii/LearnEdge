import axios from 'axios';

const API_URL = 'http://localhost:3001/';

const courseService = {
  createCourse: async (courseData) => {
    try {
      const { title, description, file, token } = courseData;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);

      const response = await axios.post(`${API_URL}courses`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000,
      });

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Solicitud cancelada:', error.message);
      } else {
        throw error;
      }
    }
  },
  getCourses: async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCourseById: async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCourse: async (courseId, userId) => {
    try {
      const response = await axios.put(`${API_URL}/courses/${courseId}`, { userId }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await axios.delete(`${API_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default courseService;
