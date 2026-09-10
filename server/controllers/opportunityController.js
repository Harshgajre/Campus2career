const Opportunity = require('../models/Opportunity');

// @desc    Get all active opportunities (Public & Authenticated)
// @route   GET /api/opportunities
// @access  Public
exports.getOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find({ status: 'open' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: opportunities.length, opportunities });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single opportunity
// @route   GET /api/opportunities/:id
// @access  Public
exports.getOpportunityById = async (req, res, next) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }
    res.status(200).json({ success: true, opportunity: opp });
  } catch (error) {
    next(error);
  }
};
