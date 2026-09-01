const express = require('express');
const router = express.Router();
const {
  getStudentDashboard,
  getStudentSkills,
  addStudentSkill,
  updateStudentSkill,
  deleteStudentSkill,
  getStudentProjects,
  createStudentProject,
  updateStudentProject,
  deleteStudentProject,
  getStudentPassport,
  getStudentRoadmap,
  getStudentApplications,
  applyOpportunity,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getStudentDashboard);
router.get('/skills', protect, getStudentSkills);
router.post('/skills', protect, addStudentSkill);
router.put('/skills/:skillId', protect, updateStudentSkill);
router.delete('/skills/:skillId', protect, deleteStudentSkill);

router.get('/projects', protect, getStudentProjects);
router.post('/projects', protect, createStudentProject);
router.put('/projects/:id', protect, updateStudentProject);
router.delete('/projects/:id', protect, deleteStudentProject);

router.get('/passport', getStudentPassport);
router.get('/roadmap', protect, getStudentRoadmap);
router.get('/applications', protect, getStudentApplications);
router.post('/apply', protect, applyOpportunity);

module.exports = router;
