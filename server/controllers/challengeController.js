const Challenge = require('../models/Challenge');
const ChallengeSubmission = require('../models/ChallengeSubmission');
const Student = require('../models/Student');

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Public
exports.getChallenges = async (req, res, next) => {
  try {
    const challenges = await Challenge.find({ status: 'active' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: challenges.length, challenges });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit Challenge Solution
// @route   POST /api/challenges/:id/submit
// @access  Private (Student)
exports.submitChallengeSolution = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { codeRepoUrl, liveDemoUrl, submissionNotes } = req.body;

    let student = await Student.findOne({ user: req.user.id });
    if (!student) {
      student = await Student.create({ user: req.user.id });
    }

    const challenge = await Challenge.findById(id);

    const submission = await ChallengeSubmission.create({
      challenge: id,
      student: student._id,
      studentName: req.user.name,
      challengeTitle: challenge ? challenge.title : 'Skill Challenge',
      codeRepoUrl,
      liveDemoUrl: liveDemoUrl || '',
      submissionNotes: submissionNotes || '',
      status: 'Submitted',
    });

    if (challenge) {
      challenge.participantsCount += 1;
      await challenge.save();
    }

    res.status(201).json({ success: true, message: 'Challenge solution submitted successfully!', submission });
  } catch (error) {
    next(error);
  }
};
