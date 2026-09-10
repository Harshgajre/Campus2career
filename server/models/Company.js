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
      default: 'TechCorp Solutions',
    },
    industryType: {
      type: String,
      default: 'Information Technology & Software',
    },
    website: {
      type: String,
      default: 'https://techcorp.example.com',
    },
    location: { type: String, default: 'Bangalore, India' },
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
    openOpportunitiesCount: { type: Number, default: 18 },
    totalCandidatesCount: { type: Number, default: 320 },
    shortlistedCount: { type: Number, default: 64 },
    interviewsCount: { type: Number, default: 26 },
    gstNumber: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);
