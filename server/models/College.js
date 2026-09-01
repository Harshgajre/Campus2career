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
      default: 'Apex Institute of Technology',
    },
    code: {
      type: String,
      default: 'AIT-4110',
    },
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
    totalStudents: { type: Number, default: 1245 },
    activePrograms: { type: Number, default: 32 },
    internshipsCount: { type: Number, default: 85 },
    placementsCount: { type: Number, default: 62 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);
