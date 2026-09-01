const Opportunity = require('../models/Opportunity');

// @desc    Get all active opportunities (Public & Authenticated)
// @route   GET /api/opportunities
// @access  Public
exports.getOpportunities = async (req, res, next) => {
  try {
    let opportunities = await Opportunity.find({ status: 'open' }).sort({ createdAt: -1 });

    if (opportunities.length === 0) {
      opportunities = [
        {
          _id: 'opp-1',
          title: 'Frontend Developer Intern',
          companyName: 'TechCorp Solutions',
          companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=120',
          type: 'Internship',
          location: 'Bangalore / Remote',
          locationType: 'Hybrid',
          stipend: '₹35,000 / month',
          duration: '6 Months',
          deadline: '5d left',
          requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
          description: 'Build modern user-facing web applications with React 18, Tailwind, and performant state pipelines.',
          openingsCount: 4,
          applicationsCount: 48,
          status: 'open',
        },
        {
          _id: 'opp-2',
          title: 'UI/UX Design Specialist',
          companyName: 'DesignStudio Innovations',
          companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=120',
          type: 'Internship',
          location: 'Mumbai / Remote',
          locationType: 'Remote',
          stipend: '₹25,000 / month',
          duration: '3 Months',
          deadline: '1w left',
          requiredSkills: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
          description: 'Craft high fidelity design systems, micro-interactions, and conduct usability research.',
          openingsCount: 2,
          applicationsCount: 31,
          status: 'open',
        },
        {
          _id: 'opp-3',
          title: 'Web Developer Intern',
          companyName: 'CodeSoft Global',
          companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=120',
          type: 'Internship',
          location: 'Hyderabad / Hybrid',
          locationType: 'Hybrid',
          stipend: '₹28,000 / month',
          duration: '6 Months',
          deadline: '8d left',
          requiredSkills: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
          description: 'Develop REST endpoints, database schemas, and integrate responsive UI views.',
          openingsCount: 5,
          applicationsCount: 54,
          status: 'open',
        },
        {
          _id: 'opp-4',
          title: 'AI/ML Research Intern',
          companyName: 'NextGen Robotics AI',
          companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=120',
          type: 'Internship',
          location: 'Gurgaon / On-site',
          locationType: 'On-site',
          stipend: '₹40,000 / month',
          duration: '6 Months',
          deadline: '10d left',
          requiredSkills: ['Python', 'PyTorch', 'Computer Vision', 'LangChain'],
          description: 'Work on cutting-edge generative AI models and computer vision pipelines.',
          openingsCount: 2,
          applicationsCount: 22,
          status: 'open',
        },
      ];
    }

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
