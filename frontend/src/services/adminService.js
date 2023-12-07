import axios from 'axios';

const API_URL = 'http://localhost:3001/admin/users';

const adminUserService = {
  getAllUsers: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserById: async (adminId, userId, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${adminId}/${userId}`, { userData });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUserById: async (adminId, userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/${adminId}/${userId}`, {
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
