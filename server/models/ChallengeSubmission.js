const mongoose = require('mongoose');

const challengeSubmissionSchema = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    studentName: { type: String, required: true },
    challengeTitle: { type: String, required: true },
    codeRepoUrl: { type: String, required: true },
    liveDemoUrl: { type: String, default: '' },
    submissionNotes: { type: String, default: '' },
    score: { type: Number, default: 0 },
    feedback: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Accepted', 'Winner'],
      default: 'Submitted',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChallengeSubmission', challengeSubmissionSchema);
