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

router.get('/dashboard', protect, getAdminDashboard);
router.get('/students', protect, getAdminStudents);
router.get('/companies', protect, getAdminCompanies);
router.get('/colleges', protect, getAdminColleges);
router.get('/skills', protect, getAdminSkills);
router.post('/skills', protect, createAdminSkill);
router.delete('/skills/:id', protect, deleteAdminSkill);
router.get('/analytics-reports', protect, getAnalyticsReports);

module.exports = router;
