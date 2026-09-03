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
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('admin'));
router.get('/dashboard', getAdminDashboard);
router.get('/students', getAdminStudents);
router.get('/companies', getAdminCompanies);
router.get('/colleges', getAdminColleges);
router.get('/skills', getAdminSkills);
router.post('/skills', createAdminSkill);
router.delete('/skills/:id', deleteAdminSkill);
router.get('/analytics-reports', getAnalyticsReports);

module.exports = router;
