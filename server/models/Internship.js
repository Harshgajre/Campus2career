const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
    },
    studentName: { type: String, required: true },
    companyName: { type: String, required: true },
    roleTitle: { type: String, required: true, default: 'Full Stack Engineer Intern' },
    department: { type: String, default: 'Computer Science' },
    stipend: { type: String, default: '₹35,000 / mo' },
    startDate: { type: String, default: '2026-06-01' },
    endDate: { type: String, default: '2026-12-01' },
    mentorName: { type: String, default: 'Siddharth Rao (Principal Architect)' },
    progressPercentage: { type: Number, default: 65 },
    performanceScore: { type: String, default: 'Outstanding (9.4/10)' },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Extended'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);
