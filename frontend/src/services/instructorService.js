import axios from 'axios';

const API_URL = 'http://localhost:3001/instructors';
const API_URL_ID = 'http://localhost:3001/instructors';

const instructorService = {
  getAllInstructors: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log('Respuesta del servidor (getAllInstructors):', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getInstructorById: async (instructorId) => {
    try {
      const url = `${API_URL_ID}/${instructorId}`;
      console.log('URL de la solicitud:', url);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateInstructorById: async (instructorId, instructorData) => {
    try {
      const response = await axios.put(`${API_URL_ID}/${instructorId}`, instructorData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteInstructorById: async (instructorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/${instructorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        throw error;
      }
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await axios.post(`${API_URL}/create-course`, courseData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default instructorService;
