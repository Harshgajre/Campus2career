const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
    },
    studentName: { type: String, required: true },
    companyName: { type: String, required: true },
    designation: { type: String, required: true, default: 'Software Development Engineer I' },
    packageLPA: { type: Number, required: true, default: 18.5 },
    department: { type: String, default: 'Computer Science' },
    offerDate: { type: String, default: '2026-08-20' },
    location: { type: String, default: 'Bangalore' },
    status: {
      type: String,
      enum: ['Accepted', 'Offered', 'Joined'],
      default: 'Accepted',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Placement', placementSchema);
