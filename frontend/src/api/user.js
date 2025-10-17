import api from './api';

export const user = {
  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/user/getallusers');
    return response.data;
  },

  // Get single user by ID
  getUserById: async (id) => {
    const response = await api.get(`/user/${id}`);
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

  // Get users that current user is following
  getFollowing: async (userId) => {
    const response = await api.get(`/user/${userId}/following`);
    return response.data;
  },

  // Get followers of current user
  getFollowers: async (userId) => {
    const response = await api.get(`/user/${userId}/followers`);
    return response.data;
  },
};