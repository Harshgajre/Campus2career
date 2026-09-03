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
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('student'));

router.get('/dashboard', getStudentDashboard);
router.get('/skills', getStudentSkills);
router.post('/skills', addStudentSkill);
router.put('/skills/:skillId', updateStudentSkill);
router.delete('/skills/:skillId', deleteStudentSkill);

router.get('/projects', getStudentProjects);
router.post('/projects', createStudentProject);
router.put('/projects/:id', updateStudentProject);
router.delete('/projects/:id', deleteStudentProject);

router.get('/passport', getStudentPassport);
router.get('/roadmap', getStudentRoadmap);
router.get('/applications', getStudentApplications);
router.post('/apply', applyOpportunity);

module.exports = router;
