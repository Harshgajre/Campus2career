const Challenge = require('../models/Challenge');
const ChallengeSubmission = require('../models/ChallengeSubmission');
const Student = require('../models/Student');

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Public
exports.getChallenges = async (req, res, next) => {
  try {
    let challenges = await Challenge.find().sort({ createdAt: -1 });

    if (challenges.length === 0) {
      challenges = [
        {
          _id: 'chal-1',
          title: 'React & Tailwind Enterprise Dashboard UI',
          companyName: 'TechCorp Solutions',
          organizerRole: 'Industry Sponsor',
          description: 'Design and build a responsive analytics dashboard with dark mode and Recharts telemetry.',
          difficulty: 'Intermediate',
          category: 'Frontend Development',
          requiredSkills: ['React', 'Tailwind CSS', 'Recharts', 'State Management'],
          deadline: '1w left',
          prizePoints: '₹25,000 + Direct Interview Call',
          participantsCount: 142,
          status: 'active',
        },
        {
          _id: 'chal-2',
          title: 'High-Concurrency Rate Limiter & Cache in Go/Node.js',
          companyName: 'CodeSoft Global',
          organizerRole: 'Infrastructure Sponsor',
          description: 'Build a distributed token-bucket rate limiter backed by Redis with sub-millisecond response times.',
          difficulty: 'Advanced',
          category: 'Backend & Distributed Systems',
          requiredSkills: ['Node.js', 'Redis', 'Docker', 'System Design'],
          deadline: '4d left',
          prizePoints: '₹35,000 + Internship Offer',
          participantsCount: 88,
          status: 'active',
        },
        {
          _id: 'chal-3',
          title: 'SIH AI Skill Passport Verifier & Radar Scoring',
          companyName: 'Campus2Career Core Team',
          organizerRole: 'Platform Challenge',
          description: 'Develop an AI algorithm that parses student GitHub projects and produces a verifiable skill score.',
          difficulty: 'Advanced',
          category: 'AI & Data Science',
          requiredSkills: ['Python', 'FastAPI', 'OpenAI API', 'React'],
          deadline: '2w left',
          prizePoints: '₹50,000 + Gold Badge',
          participantsCount: 210,
          status: 'active',
        },
      ];
    }

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
