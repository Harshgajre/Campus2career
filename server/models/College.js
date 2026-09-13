const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    institutionName: {
      type: String,
      required: true,
    },
    code: { type: String, required: true, trim: true },
    university: {
      type: String,
      default: 'State Technological University',
    },
    state: { type: String, default: 'Maharashtra' },
    city: { type: String, default: 'Pune' },
    accreditation: { type: String, default: 'NAAC A++' },
    contactPerson: { type: String, default: 'Dr. Mehta' },
    designation: { type: String, default: 'Dean of Academics & Placements' },
    approvedStatus: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'approved',
    },
    totalStudents: { type: Number, default: 0 },
    activePrograms: { type: Number, default: 0 },
    internshipsCount: { type: Number, default: 0 },
    placementsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);
