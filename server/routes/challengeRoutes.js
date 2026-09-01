const express = require('express');
const router = express.Router();
const { getChallenges, submitChallengeSolution } = require('../controllers/challengeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getChallenges);
router.post('/:id/submit', protect, submitChallengeSolution);

module.exports = router;
