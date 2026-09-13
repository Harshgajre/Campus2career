const mongoose = require('mongoose');
const { SKILL_CATEGORIES } = require('../utils/skillCategories');

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: SKILL_CATEGORIES,
    default: 'Frontend',
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate',
  },
  verified: { type: Boolean, default: false },
  score: { type: Number, default: 80 },
  verifiedAt: { type: Date },
});

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
    },
    collegeName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, match: [/^\d{10}$/, 'Phone must be exactly 10 digits'] },
    rollNumber: { type: String, required: true, trim: true },
    department: {
      type: String,
      enum: ['Computer Science', 'Information Technology', 'AI & Data Science', 'Electronics', 'Mechanical', 'Other'],
      default: 'Computer Science',
    },
    semester: { type: Number, default: 6 },
    cgpa: { type: Number, default: 8.9 },
    bio: { type: String, default: 'Passionate Full Stack Developer & Open Source Contributor.' },
    skills: [skillItemSchema],
    overallProgress: { type: Number, default: 75 },
    employabilityScore: { type: Number, default: 88 },
    githubUrl: {
      type: String,
      default: '',
      validate: {
        validator: (value) => !value || /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/i.test(value),
        message: 'Please provide a valid GitHub profile URL',
      },
    },
    linkedinUrl: { type: String, default: 'https://linkedin.com/in/harshgajre' },
    portfolioUrl: { type: String, default: 'https://harshgajre.dev' },
    resumeUrl: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },
    extractedResumeData: {
      rawText: { type: String, default: '' },
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      college: { type: String, default: '' },
      skills: [{ type: String }],
      education: [mongoose.Schema.Types.Mixed],
      projects: [mongoose.Schema.Types.Mixed],
      experience: [mongoose.Schema.Types.Mixed],
      certifications: [mongoose.Schema.Types.Mixed],
    },
    passportId: { type: String, default: '' },
    challengesCompletedCount: { type: Number, default: 0 },
    projectsCompletedCount: { type: Number, default: 0 },
    applicationsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

studentSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
