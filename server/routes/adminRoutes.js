const express = require('express');
const router = express.Router();
const {
  getAdminDashboard,
  getAdminStudents,
  getAdminCompanies,
  getAdminColleges,
  getAdminSkills,
  createAdminSkill,
  deleteAdminSkill,
  getAnalyticsReports,
  getAdminOpportunities,
  getAdminChallenges,
  deleteAdminUser,
  toggleUserStatus,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('admin'));
router.get('/dashboard', getAdminDashboard);
router.get('/students', getAdminStudents);
router.get('/companies', getAdminCompanies);
router.get('/colleges', getAdminColleges);
router.get('/opportunities', getAdminOpportunities);
router.get('/challenges', getAdminChallenges);
router.get('/skills', getAdminSkills);
router.post('/skills', createAdminSkill);
router.delete('/skills/:id', deleteAdminSkill);
router.get('/analytics-reports', getAnalyticsReports);
router.delete('/users/:id', deleteAdminUser);
router.put('/users/:id/status', toggleUserStatus);

module.exports = router;
