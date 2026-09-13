const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    industryType: {
      type: String,
      default: '',
    },
    website: { type: String, default: '' },
    location: { type: String, default: '' },
    size: { type: String, default: '500-1000 employees' },
    description: {
      type: String,
      default: 'Leading enterprise cloud and full-stack software development powerhouse.',
    },
    hrName: { type: String, default: 'Riya Patel' },
    hrDesignation: { type: String, default: 'Lead Talent Acquisition Partner' },
    verifiedStatus: {
      type: String,
      enum: ['verified', 'pending', 'rejected'],
      default: 'verified',
    },
    openOpportunitiesCount: { type: Number, default: 0 },
    totalCandidatesCount: { type: Number, default: 0 },
    shortlistedCount: { type: Number, default: 0 },
    interviewsCount: { type: Number, default: 0 },
    gstNumber: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);
