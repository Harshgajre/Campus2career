const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: { type: String, default: 'DesignStudio / TechCorp' },
    organizerRole: { type: String, default: 'Industry Sponsor' },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate',
    },
    category: { type: String, default: 'Full Stack Development' },
    requiredSkills: [{ type: String }],
    deadline: { type: String, default: '1w left' },
    deadlineDate: { type: Date },
    prizePoints: { type: String, default: '₹25,000 + Direct Interview Call' },
    participantsCount: { type: Number, default: 142 },
    status: {
      type: String,
      enum: ['active', 'completed', 'upcoming'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Challenge', challengeSchema);
