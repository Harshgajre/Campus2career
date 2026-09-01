const express = require('express');
const router = express.Router();
const {
  getCompanyDashboard,
  getCompanyOpportunities,
  createOpportunity,
  searchCandidates,
  getCompanyInterviews,
  scheduleInterview,
  getActiveInterns,
} = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getCompanyDashboard);
router.get('/opportunities', protect, getCompanyOpportunities);
router.post('/opportunities', protect, createOpportunity);
router.get('/candidates', protect, searchCandidates);
router.get('/interviews', protect, getCompanyInterviews);
router.post('/interviews', protect, scheduleInterview);
router.get('/interns', protect, getActiveInterns);

module.exports = router;
