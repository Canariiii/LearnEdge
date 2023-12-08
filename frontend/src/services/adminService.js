import axios from 'axios';

const API_URL = 'http://localhost:3001/users';
const API_URL_ID = 'http://localhost:3001/users/profile';


const adminUserService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log('Respuesta del servidor (getAllUsers):', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getUserById: async (userId) => {
    try {
      const url = `${API_URL_ID}/${userId}`;
      console.log('URL de la solicitud:', url);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateUserById: async (userId, userData) => {
    try {
      const response = await axios.put(`${API_URL_ID}/${userId}`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  

  deleteUserById: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/${userId}`, {
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
};

export default adminUserService;
