const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentAvatar: { type: String },
    roleTitle: { type: String, default: 'Frontend Engineer Intern' },
    date: { type: String, required: true, default: '2026-09-10' },
    time: { type: String, required: true, default: '11:00 AM IST' },
    type: {
      type: String,
      enum: ['Technical Round 1', 'Technical Round 2', 'System Design', 'HR Round', 'Managerial'],
      default: 'Technical Round 1',
    },
    meetingLink: { type: String, default: 'https://meet.google.com/abc-defg-hij' },
    interviewerName: { type: String, default: 'Alex Morgan' },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
      default: 'Scheduled',
    },
    notes: { type: String, default: 'Focus on React performance, Redux state design, and CSS mastery.' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
