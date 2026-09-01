const mongoose = require('mongoose');

const trainingProgramSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
    },
    collegeName: { type: String, default: 'Apex Institute of Technology' },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillsCovered: [{ type: String }],
    department: { type: String, default: 'Computer Science & IT' },
    trainerName: { type: String, default: 'Dr. R. K. Sharma (Industry Expert)' },
    startDate: { type: String, default: '2026-09-15' },
    endDate: { type: String, default: '2026-11-30' },
    durationWeeks: { type: Number, default: 8 },
    enrolledCount: { type: Number, default: 120 },
    maxCapacity: { type: Number, default: 150 },
    progress: { type: Number, default: 45 },
    status: {
      type: String,
      enum: ['active', 'upcoming', 'completed'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TrainingProgram', trainingProgramSchema);
