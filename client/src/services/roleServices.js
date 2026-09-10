import API from './api';

export const studentService = {
  getDashboard: async () => {
    const res = await API.get('/students/dashboard');
    return res.data;
  },
  getSkills: async () => {
    const res = await API.get('/students/skills');
    return res.data;
  },
  addSkill: async (skillData) => {
    const res = await API.post('/students/skills', skillData);
    return res.data;
  },
  updateSkill: async (id, skillData) => {
    const res = await API.put(`/students/skills/${id}`, skillData);
    return res.data;
  },
  deleteSkill: async (id) => {
    const res = await API.delete(`/students/skills/${id}`);
    return res.data;
  },
  getProjects: async () => {
    const res = await API.get('/students/projects');
    return res.data;
  },
  getOpportunities: async () => {
    const res = await API.get('/students/opportunities');
    return res.data;
  },
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const res = await API.post('/students/upload-resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  },
  createProject: async (projectData) => {
    const res = await API.post('/students/projects', projectData);
    return res.data;
  },
  updateProject: async (id, projectData) => {
    const res = await API.put(`/students/projects/${id}`, projectData);
    return res.data;
  },
  deleteProject: async (id) => {
    const res = await API.delete(`/students/projects/${id}`);
    return res.data;
  },
  getPassport: async () => {
    const res = await API.get('/students/passport');
    return res.data;
  },
  getRoadmap: async () => {
    const res = await API.get('/students/roadmap');
    return res.data;
  },
  getApplications: async () => {
    const res = await API.get('/students/applications');
    return res.data;
  },
  applyOpportunity: async (data) => {
    const res = await API.post('/students/apply', data);
    return res.data;
  },
};

export const collegeService = {
  getDashboard: async () => {
    const res = await API.get('/colleges/dashboard');
    return res.data;
  },
  getStudents: async () => {
    const res = await API.get('/colleges/students');
    return res.data;
  },
  getSkillAnalytics: async () => {
    const res = await API.get('/colleges/analytics');
    return res.data;
  },
  getSkillGap: async () => {
    const res = await API.get('/colleges/skill-gap');
    return res.data;
  },
  getTrainingPrograms: async () => {
    const res = await API.get('/colleges/training-programs');
    return res.data;
  },
  createTrainingProgram: async (data) => {
    const res = await API.post('/colleges/training-programs', data);
    return res.data;
  },
  getCollaborations: async () => {
    const res = await API.get('/colleges/collaborations');
    return res.data;
  },
  getPlacements: async () => {
    const res = await API.get('/colleges/placements');
    return res.data;
  },
};

export const companyService = {
  getDashboard: async () => {
    const res = await API.get('/companies/dashboard');
    return res.data;
  },
  getOpportunities: async () => {
    const res = await API.get('/companies/opportunities');
    return res.data;
  },
  createOpportunity: async (data) => {
    const res = await API.post('/companies/opportunities', data);
    return res.data;
  },
  getCandidates: async () => {
    const res = await API.get('/companies/candidates');
    return res.data;
  },
  getInterviews: async () => {
    const res = await API.get('/companies/interviews');
    return res.data;
  },
  scheduleInterview: async (data) => {
    const res = await API.post('/companies/interviews', data);
    return res.data;
  },
  getInterns: async () => {
    const res = await API.get('/companies/interns');
    return res.data;
  },
  getChallenges: async () => {
    const res = await API.get('/companies/challenges');
    return res.data;
  },
  createChallenge: async (data) => {
    const res = await API.post('/companies/challenges', data);
    return res.data;
  },
};

export const adminService = {
  getDashboard: async () => {
    const res = await API.get('/admin/dashboard');
    return res.data;
  },
  getStudents: async () => {
    const res = await API.get('/admin/students');
    return res.data;
  },
  getCompanies: async () => {
    const res = await API.get('/admin/companies');
    return res.data;
  },
  getColleges: async () => {
    const res = await API.get('/admin/colleges');
    return res.data;
  },
  getSkills: async () => {
    const res = await API.get('/admin/skills');
    return res.data;
  },
  createSkill: async (data) => {
    const res = await API.post('/admin/skills', data);
    return res.data;
  },
  deleteSkill: async (id) => {
    const res = await API.delete(`/admin/skills/${id}`);
    return res.data;
  },
  getAnalyticsReports: async () => {
    const res = await API.get('/admin/analytics-reports');
    return res.data;
  },
};

export const publicService = {
  getOpportunities: async () => {
    const res = await API.get('/opportunities');
    return res.data;
  },
  getChallenges: async () => {
    const res = await API.get('/challenges');
    return res.data;
  },
  submitChallenge: async (id, data) => {
    const res = await API.post(`/challenges/${id}/submit`, data);
    return res.data;
  },
  getNotifications: async () => {
    const res = await API.get('/notifications');
    return res.data;
  },
};
