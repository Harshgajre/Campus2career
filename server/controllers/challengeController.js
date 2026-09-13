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

    if (req.user.role !== 'student') return res.status(403).json({ success: false, message: 'Only students can submit challenge solutions' });
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const challenge = await Challenge.findById(id);
    if (!challenge || challenge.status !== 'active') return res.status(404).json({ success: false, message: 'Active challenge not found' });
    const existing = await ChallengeSubmission.findOne({ challenge: challenge._id, student: student._id });
    if (existing) return res.status(400).json({ success: false, message: 'You have already submitted a solution for this challenge' });

    const submission = await ChallengeSubmission.create({
      challenge: challenge._id,
      student: student._id,
      studentName: req.user.name,
      challengeTitle: challenge.title,
      codeRepoUrl,
      liveDemoUrl: liveDemoUrl || '',
      submissionNotes: submissionNotes || '',
      status: 'Submitted',
    });

    challenge.participantsCount += 1;
    await challenge.save();

    res.status(201).json({ success: true, message: 'Challenge solution submitted successfully!', submission });
  } catch (error) {
    next(error);
  }
};
