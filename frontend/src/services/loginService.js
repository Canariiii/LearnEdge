import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; 

// userService.js
const UserService = {
  login: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, userData);
      return response; 
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
