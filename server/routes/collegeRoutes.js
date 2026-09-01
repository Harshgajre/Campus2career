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
} = require('../controllers/collegeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getCollegeDashboard);
router.get('/students', protect, getCollegeStudents);
router.get('/analytics', protect, getCollegeSkillAnalytics);
router.get('/skill-gap', protect, getSkillGap);
router.get('/training-programs', protect, getTrainingPrograms);
router.post('/training-programs', protect, createTrainingProgram);
router.get('/collaborations', protect, getIndustryCollaborations);
router.get('/placements', protect, getCollegePlacements);

module.exports = router;
