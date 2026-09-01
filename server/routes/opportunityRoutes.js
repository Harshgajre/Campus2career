const express = require('express');
const router = express.Router();
const { getOpportunities, getOpportunityById } = require('../controllers/opportunityController');

router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);

module.exports = router;
