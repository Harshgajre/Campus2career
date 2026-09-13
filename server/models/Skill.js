const mongoose = require('mongoose');
const { SKILL_CATEGORIES } = require('../utils/skillCategories');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: SKILL_CATEGORIES,
      default: 'Frontend',
    },
    description: { type: String, default: '' },
    demandLevel: {
      type: String,
      enum: ['High', 'Very High', 'Medium', 'Emerging'],
      default: 'High',
    },
    industryDemandPercent: { type: Number, default: 85 },
    activeStudentsCount: { type: Number, default: 450 },
    icon: { type: String, default: 'code' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
