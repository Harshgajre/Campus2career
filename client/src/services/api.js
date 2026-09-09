import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://campus2career-cluu.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor to attach JWT Bearer token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('c2c_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Preserve backend errors so authenticated screens never present mock data as real data.
API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default API;
