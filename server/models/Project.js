const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [{ type: String }],
    githubLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    image: { type: String, default: '' },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'completed',
    },
    featured: { type: Boolean, default: false },
    likes: { type: Number, default: 12 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
