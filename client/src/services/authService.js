import API from './api';

export const authService = {
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
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
  parseResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await API.post('/auth/parse-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
