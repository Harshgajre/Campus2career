const express = require('express');
const router = express.Router();
const {
  getCompanyDashboard,
  getCompanyOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  searchCandidates,
  getShortlistedCandidates,
  getSkillRequirements,
  getCompanyInterviews,
  scheduleInterview,
  getActiveInterns,
  updateApplicationStatus,
  getCompanyProfile,
  updateCompanyProfile,
  getCompanyChallenges,
  createChallenge,
  getChallengeSubmissions,
} = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('company'));

router.get('/profile', getCompanyProfile);
router.put('/profile', updateCompanyProfile);
router.get('/dashboard', getCompanyDashboard);
router.get('/opportunities', getCompanyOpportunities);
router.post('/opportunities', createOpportunity);
router.put('/opportunities/:id', updateOpportunity);
router.delete('/opportunities/:id', deleteOpportunity);
router.get('/candidates', searchCandidates);
router.get('/shortlisted', getShortlistedCandidates);
router.get('/skill-requirements', getSkillRequirements);
router.get('/challenges', getCompanyChallenges);
router.post('/challenges', createChallenge);
router.get('/challenge-submissions', getChallengeSubmissions);
router.get('/interviews', getCompanyInterviews);
router.post('/interviews', scheduleInterview);
router.get('/interns', getActiveInterns);
router.put('/applications/:id/status', updateApplicationStatus);

module.exports = router;
