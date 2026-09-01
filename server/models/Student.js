const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Data Science & AI', 'DevOps & Cloud', 'Core CS', 'Mobile', 'UI/UX', 'Other'],
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
    collegeName: { type: String, default: 'MIT Institute of Technology' },
    rollNumber: { type: String, default: 'STU-2024-001' },
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
    githubUrl: { type: String, default: 'https://github.com/harshgajre' },
    linkedinUrl: { type: String, default: 'https://linkedin.com/in/harshgajre' },
    portfolioUrl: { type: String, default: 'https://harshgajre.dev' },
    resumeUrl: { type: String, default: 'https://campus2career.io/resumes/harsh-gajre.pdf' },
    passportId: { type: String, default: 'C2C-PASSPORT-2026-HG01' },
    challengesCompletedCount: { type: Number, default: 8 },
    projectsCompletedCount: { type: Number, default: 5 },
    applicationsCount: { type: Number, default: 3 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
