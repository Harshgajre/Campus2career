const express = require('express');
const router = express.Router();
const {
  getCollegeDashboard,
  getCollegeStudents,
  getCollegeSkillAnalytics,
  getSkillGap,
  getTrainingPrograms,
  createTrainingProgram,
  getIndustryCollaborations,
  getCollegePlacements,
  getCollegeInternships,
  getCollegeProfile,
  updateCollegeProfile,
  getCollegeApplications,
  getCollegeChallengeResults,
} = require('../controllers/collegeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('college'));
router.get('/profile', getCollegeProfile);
router.put('/profile', updateCollegeProfile);
router.get('/dashboard', getCollegeDashboard);
router.get('/students', getCollegeStudents);
router.get('/analytics', getCollegeSkillAnalytics);
router.get('/skill-gap', getSkillGap);
router.get('/training-programs', getTrainingPrograms);
router.post('/training-programs', createTrainingProgram);
router.get('/collaborations', getIndustryCollaborations);
router.get('/internships', getCollegeInternships);
router.get('/applications', getCollegeApplications);
router.get('/challenge-results', getCollegeChallengeResults);
router.get('/placements', getCollegePlacements);

module.exports = router;
