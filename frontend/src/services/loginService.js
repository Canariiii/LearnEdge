import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; 

const UserService = {
  login: async (userData) => {
    try {
      console.log(`${BASE_URL}/users/login`, userData);
      const response = await axios.post(`${BASE_URL}/users/login`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;