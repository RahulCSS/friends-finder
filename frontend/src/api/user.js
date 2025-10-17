import api from './api';

export const user = {
  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/user/getallusers');
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/user/addUser', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  },

};