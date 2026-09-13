const express = require('express');
const router = express.Router();
const { getChallenges, submitChallengeSolution } = require('../controllers/challengeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getChallenges);
router.post('/:id/submit', protect, authorize('student'), submitChallengeSolution);

module.exports = router;
