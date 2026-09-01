import API from './api';

export const authService = {
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },
  demoLogin: async (role) => {
    const response = await API.post('/auth/demo-login', { role });
    return response.data;
  },
  registerStudent: async (data) => {
    const response = await API.post('/auth/register-student', data);
    return response.data;
  },
  registerCollege: async (data) => {
    const response = await API.post('/auth/register-college', data);
    return response.data;
  },
  registerCompany: async (data) => {
    const response = await API.post('/auth/register-company', data);
    return response.data;
  },
  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await API.put('/auth/profile', data);
    return response.data;
  },
};
