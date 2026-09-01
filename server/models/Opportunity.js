const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    companyName: { type: String, required: true },
    companyLogo: { type: String, default: '' },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Internship', 'Job', 'Training', 'Challenge'],
      default: 'Internship',
    },
    location: { type: String, default: 'Bangalore / Remote' },
    locationType: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      default: 'Hybrid',
    },
    stipend: { type: String, default: '₹35,000 / month' },
    duration: { type: String, default: '6 Months' },
    deadline: { type: String, default: '5d left' },
    deadlineDate: { type: Date },
    requiredSkills: [{ type: String }],
    preferredSkills: [{ type: String }],
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    openingsCount: { type: Number, default: 4 },
    status: {
      type: String,
      enum: ['open', 'closed', 'draft'],
      default: 'open',
    },
    applicationsCount: { type: Number, default: 28 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Opportunity', opportunitySchema);
