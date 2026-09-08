import axios from 'axios';
import { mockData } from './mockData';

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

// Response interceptor to handle errors and return mock data
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is due to network/connection issues, return mock data
    if (!error.response || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.warn('⚠️ Backend unavailable. Using mock data for:', error.config?.url);
      
      const url = error.config?.url || '';
      if (url.includes('/auth/') && !url.includes('/auth/demo-login') && !url.includes('/auth/me') && !url.includes('/auth/login')) {
        return Promise.reject(error);
      }
      let mockResponse = null;

      // Match URL patterns to return appropriate mock data
      if (url.includes('/auth/me')) {
        const role = localStorage.getItem('c2c_user_role') || 'student';
        const mockRole = mockData[role] || mockData.student;
        mockResponse = {
          success: true,
          user: mockRole.user,
          roleDetails: { role, data: mockRole },
        };
      } else if (url.includes('/students/dashboard')) {
        mockResponse = mockData.student.dashboard;
      } else if (url.includes('/students/skills')) {
        mockResponse = mockData.student.skills;
      } else if (url.includes('/students/projects')) {
        mockResponse = mockData.student.projects;
      } else if (url.includes('/students/applications')) {
        mockResponse = mockData.student.applications;
      } else if (url.includes('/students/passport')) {
        mockResponse = mockData.student.passport;
      } else if (url.includes('/students/roadmap')) {
        mockResponse = mockData.student.roadmap;
      } else if (url.includes('/colleges/dashboard')) {
        mockResponse = mockData.college.dashboard;
      } else if (url.includes('/colleges/students')) {
        mockResponse = mockData.college.students;
      } else if (url.includes('/colleges/analytics')) {
        mockResponse = mockData.college.analytics;
      } else if (url.includes('/colleges/skill-gap')) {
        mockResponse = mockData.college.skillGap;
      } else if (url.includes('/colleges/training-programs')) {
        mockResponse = mockData.college.trainingPrograms;
      } else if (url.includes('/colleges/collaborations')) {
        mockResponse = mockData.college.collaborations;
      } else if (url.includes('/colleges/internships')) {
        mockResponse = mockData.college.internships;
      } else if (url.includes('/colleges/placements')) {
        mockResponse = mockData.college.placements;
      } else if (url.includes('/companies/dashboard')) {
        mockResponse = mockData.company.dashboard;
      } else if (url.includes('/companies/opportunities')) {
        mockResponse = mockData.company.opportunities;
      } else if (url.includes('/companies/candidates')) {
        mockResponse = mockData.company.candidates;
      } else if (url.includes('/companies/challenges')) {
        mockResponse = mockData.company.challenges;
      } else if (url.includes('/companies/shortlisted')) {
        mockResponse = mockData.company.shortlisted;
      } else if (url.includes('/companies/interviews')) {
        mockResponse = mockData.company.interviews;
      } else if (url.includes('/companies/interns')) {
        mockResponse = mockData.company.interns;
      } else if (url.includes('/companies/skill-requirements')) {
        mockResponse = mockData.company.skillRequirements;
      } else if (url.includes('/admin/dashboard')) {
        mockResponse = mockData.admin.dashboard;
      } else if (url.includes('/admin/students')) {
        mockResponse = mockData.admin.students;
      } else if (url.includes('/admin/companies')) {
        mockResponse = mockData.admin.companies;
      } else if (url.includes('/admin/colleges')) {
        mockResponse = mockData.admin.colleges;
      } else if (url.includes('/admin/opportunities')) {
        mockResponse = mockData.admin.opportunities;
      } else if (url.includes('/admin/skills')) {
        mockResponse = mockData.admin.skills;
      } else if (url.includes('/admin/challenges')) {
        mockResponse = mockData.admin.challenges;
      } else if (url.includes('/opportunities')) {
        mockResponse = mockData.public.opportunities;
      } else if (url.includes('/challenges')) {
        mockResponse = mockData.public.challenges;
      } else if (url.includes('/auth/demo-login') || url.includes('/auth/login')) {
        // Handle demo or direct login with mock data when backend is offline
        let role = 'student';
        if (error.config?.data) {
          try {
            const parsed = JSON.parse(error.config.data);
            if (parsed.role) role = parsed.role;
            else if (parsed.email) {
              if (parsed.email.includes('college') || parsed.email.includes('univ')) role = 'college';
              else if (parsed.email.includes('company') || parsed.email.includes('industry')) role = 'company';
              else if (parsed.email.includes('admin')) role = 'admin';
            }
          } catch(e) {}
        }
        const mockRole = mockData[role] || mockData.student;
        mockResponse = {
          success: true,
          token: `mock_token_${role}`,
          user: mockRole.user,
          roleDetails: { role, data: mockRole },
        };
      } else {
        // Default fallback
        mockResponse = { success: true, data: [], message: 'Using mock data' };
      }

      return Promise.resolve({ data: mockResponse });
    }

    return Promise.reject(error);
  }
);

export default API;
