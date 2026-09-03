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
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('company'));
router.get('/dashboard', getCompanyDashboard);
router.get('/opportunities', getCompanyOpportunities);
router.post('/opportunities', createOpportunity);
router.get('/candidates', searchCandidates);
router.get('/interviews', getCompanyInterviews);
router.post('/interviews', scheduleInterview);
router.get('/interns', getActiveInterns);

module.exports = router;
