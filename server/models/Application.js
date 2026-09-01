const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentAvatar: { type: String },
    opportunityTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'],
      default: 'Applied',
    },
    matchScore: { type: Number, default: 85 },
    coverNote: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    timeline: [
      {
        status: { type: String },
        date: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
