const Company = require('../models/Company');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const Challenge = require('../models/Challenge');
const Interview = require('../models/Interview');
const Internship = require('../models/Internship');
const Student = require('../models/Student');
const Notification = require('../models/Notification');

// @desc    Get Company Dashboard Data (Exact metrics from Reference Image)
// @route   GET /api/companies/dashboard
// @access  Private (Company)
exports.getCompanyDashboard = async (req, res, next) => {
  try {
    let company = await Company.findOne({ user: req.user ? req.user.id : null });

    const openOpportunitiesCount = company ? company.openOpportunitiesCount : 18;
    const totalCandidatesCount = company ? company.totalCandidatesCount : 320;
    const shortlistedCount = company ? company.shortlistedCount : 64;
    const interviewsCount = company ? company.interviewsCount : 26;

    // Applications Overview chart (Matching Company panel green spline line)
    const applicationsOverview = [
      { month: 'Jan', applications: 210 },
      { month: 'Feb', applications: 420 },
      { month: 'Mar', applications: 380 },
      { month: 'Apr', applications: 610 },
      { month: 'May', applications: 540 },
      { month: 'Jun', applications: 850 },
    ];

    // Recent Applications (Matching Reference design candidates)
    const recentApplications = [
      {
        id: 'app-harsh',
        name: 'Harsh Gajre',
        role: 'Frontend Developer',
        time: '2h ago',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        matchScore: 94,
        skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js'],
        status: 'Under Review',
      },
      {
        id: 'app-priya',
        name: 'Priya Singh',
        role: 'UI/UX Designer',
        time: '5h ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        matchScore: 91,
        skills: ['Figma', 'Prototyping', 'Design Systems', 'React'],
        status: 'Shortlisted',
      },
      {
        id: 'app-dev',
        name: 'Dev Mehta',
        role: 'Backend Developer',
        time: '1d ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        matchScore: 88,
        skills: ['Node.js', 'MongoDB', 'Python', 'Docker'],
        status: 'Interview Scheduled',
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        welcomeMessage: `Welcome Back, ${req.user.name}!`,
        subtitle: 'Find and hire the best talent for your company.',
        stats: {
          openOpportunities: { count: '18', numeric: openOpportunitiesCount, label: 'Open Opportunities' },
          totalCandidates: { count: '320', numeric: totalCandidatesCount, label: 'Total Candidates' },
          shortlisted: { count: '64', numeric: shortlistedCount, label: 'Shortlisted' },
          interviews: { count: '26', numeric: interviewsCount, label: 'Interviews' },
        },
        applicationsOverview,
        recentApplications,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Company Opportunities
// @route   GET /api/companies/opportunities
// @access  Private (Company)
exports.getCompanyOpportunities = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });
    const opportunities = await Opportunity.find({ company: company._id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Opportunity
// @route   POST /api/companies/opportunities
// @access  Private (Company)
exports.createOpportunity = async (req, res, next) => {
  try {
    const { title, type, location, locationType, stipend, duration, deadline, requiredSkills, preferredSkills, description, openingsCount } = req.body;

    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });

    const reqSkills = Array.isArray(requiredSkills)
      ? requiredSkills
      : requiredSkills ? requiredSkills.split(',').map((s) => s.trim()) : ['React', 'JavaScript'];

    const prefSkills = Array.isArray(preferredSkills)
      ? preferredSkills
      : preferredSkills ? preferredSkills.split(',').map((s) => s.trim()) : [];

    const opportunity = await Opportunity.create({
      company: company._id,
      companyName: company.companyName,
      title,
      type: type || 'Internship',
      location: location || 'Bangalore / Remote',
      locationType: locationType || 'Hybrid',
      stipend: stipend || '₹35,000 / mo',
      duration: duration || '6 Months',
      deadline: deadline || '10d left',
      requiredSkills: reqSkills,
      preferredSkills: prefSkills,
      description: description || 'Exciting role with fast-growing engineering teams.',
      openingsCount: openingsCount || 2,
      status: 'open',
    });

    res.status(201).json({ success: true, message: 'Opportunity posted successfully', opportunity });
  } catch (error) {
    next(error);
  }
};

// @desc    Search Candidates & Talent Pool
// @route   GET /api/companies/candidates
// @access  Private (Company)
exports.searchCandidates = async (req, res, next) => {
  try {
    const candidates = [
      {
        _id: 'cand-1',
        name: 'Harsh Gajre',
        email: 'harsh@campus2career.com',
        collegeName: 'MIT Institute of Technology',
        department: 'Computer Science',
        cgpa: 8.9,
        employabilityScore: 88,
        overallProgress: 75,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        skills: [
          { name: 'React', level: 'Advanced', verified: true, score: 92 },
          { name: 'Node.js', level: 'Advanced', verified: true, score: 86 },
          { name: 'JavaScript', level: 'Expert', verified: true, score: 95 },
          { name: 'Tailwind CSS', level: 'Advanced', verified: true, score: 90 },
          { name: 'MongoDB', level: 'Intermediate', verified: true, score: 82 },
        ],
        projectsCount: 5,
        challengesWon: 3,
        shortlisted: true,
        matchPercent: 96,
      },
      {
        _id: 'cand-2',
        name: 'Priya Singh',
        email: 'priya@example.com',
        collegeName: 'Apex Institute of Technology',
        department: 'Information Technology',
        cgpa: 9.2,
        employabilityScore: 92,
        overallProgress: 85,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        skills: [
          { name: 'UI/UX Design', level: 'Expert', verified: true, score: 96 },
          { name: 'Figma', level: 'Expert', verified: true, score: 98 },
          { name: 'React', level: 'Advanced', verified: true, score: 88 },
          { name: 'CSS3/Sass', level: 'Expert', verified: true, score: 94 },
        ],
        projectsCount: 6,
        challengesWon: 4,
        shortlisted: true,
        matchPercent: 91,
      },
      {
        _id: 'cand-3',
        name: 'Dev Mehta',
        email: 'dev@example.com',
        collegeName: 'National Institute of Tech',
        department: 'Computer Science',
        cgpa: 8.5,
        employabilityScore: 84,
        overallProgress: 70,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        skills: [
          { name: 'Python', level: 'Expert', verified: true, score: 94 },
          { name: 'FastAPI', level: 'Advanced', verified: true, score: 89 },
          { name: 'PostgreSQL', level: 'Advanced', verified: true, score: 86 },
          { name: 'Docker', level: 'Intermediate', verified: true, score: 80 },
        ],
        projectsCount: 4,
        challengesWon: 2,
        shortlisted: false,
        matchPercent: 88,
      },
      {
        _id: 'cand-4',
        name: 'Ananya Sharma',
        email: 'ananya@example.com',
        collegeName: 'Indian Institute of Information Tech',
        department: 'AI & Data Science',
        cgpa: 9.4,
        employabilityScore: 94,
        overallProgress: 90,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
        skills: [
          { name: 'PyTorch', level: 'Expert', verified: true, score: 95 },
          { name: 'Machine Learning', level: 'Expert', verified: true, score: 96 },
          { name: 'Python', level: 'Expert', verified: true, score: 98 },
          { name: 'SQL', level: 'Advanced', verified: true, score: 90 },
        ],
        projectsCount: 7,
        challengesWon: 5,
        shortlisted: false,
        matchPercent: 94,
      },
    ];

    res.status(200).json({ success: true, candidates });
  } catch (error) {
    next(error);
  }
};

// @desc    Get & Manage Interviews
// @route   GET /api/companies/interviews
// @access  Private (Company)
exports.getCompanyInterviews = async (req, res, next) => {
  try {
    let interviews = await Interview.find().sort({ createdAt: -1 });

    if (interviews.length === 0) {
      interviews = [
        {
          _id: 'int-1',
          studentName: 'Harsh Gajre',
          studentEmail: 'harsh@campus2career.com',
          studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          roleTitle: 'Frontend Developer Intern',
          date: '2026-09-10',
          time: '11:00 AM IST',
          type: 'Technical Round 1',
          meetingLink: 'https://meet.google.com/xyz-tech-round',
          interviewerName: 'Alex Morgan (Principal UI Engineer)',
          status: 'Scheduled',
          notes: 'React state architecture, virtual DOM, custom hooks, and live coding challenge.',
        },
        {
          _id: 'int-2',
          studentName: 'Priya Singh',
          studentEmail: 'priya@example.com',
          studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
          roleTitle: 'UI/UX Product Designer',
          date: '2026-09-12',
          time: '02:30 PM IST',
          type: 'Technical Round 2',
          meetingLink: 'https://meet.google.com/ux-design-eval',
          interviewerName: 'Riya Patel & Senior Design Lead',
          status: 'Scheduled',
          notes: 'Design system review, Figma components library walkthrough, accessibility audit.',
        },
        {
          _id: 'int-3',
          studentName: 'Dev Mehta',
          studentEmail: 'dev@example.com',
          studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
          roleTitle: 'Backend Developer (FastAPI)',
          date: '2026-09-08',
          time: '04:00 PM IST',
          type: 'System Design',
          meetingLink: 'https://meet.google.com/backend-eval',
          interviewerName: 'Siddharth Rao',
          status: 'Completed',
          notes: 'Database indexing, Redis caching, microservices architectural discussion. Passed with 9.2 rating.',
        },
      ];
    }

    res.status(200).json({ success: true, interviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Schedule Interview
// @route   POST /api/companies/interviews
// @access  Private (Company)
exports.scheduleInterview = async (req, res, next) => {
  try {
    const { studentName, studentEmail, roleTitle, date, time, type, meetingLink, interviewerName, notes } = req.body;

    let company = await Company.findOne({ user: req.user.id });
    if (!company) {
      company = await Company.create({ user: req.user.id });
    }

    const interview = await Interview.create({
      company: company._id,
      studentName: studentName || 'Candidate',
      studentEmail: studentEmail || 'candidate@example.com',
      roleTitle: roleTitle || 'Software Engineer Intern',
      date: date || '2026-09-15',
      time: time || '11:00 AM IST',
      type: type || 'Technical Round 1',
      meetingLink: meetingLink || 'https://meet.google.com/interview-room',
      interviewerName: interviewerName || 'Interview Panel',
      notes: notes || 'Interview assessment scheduled.',
      status: 'Scheduled',
    });

    res.status(201).json({ success: true, message: 'Interview scheduled successfully', interview });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Active Interns
// @route   GET /api/companies/interns
// @access  Private (Company)
exports.getActiveInterns = async (req, res, next) => {
  try {
    const interns = [
      {
        _id: 'intern-1',
        name: 'Harsh Gajre',
        roleTitle: 'Full Stack Engineering Intern',
        department: 'Engineering - Cloud Platform',
        startDate: '2026-06-01',
        endDate: '2026-12-01',
        mentorName: 'Siddharth Rao',
        progressPercentage: 65,
        rating: 'Outstanding (9.4/10)',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      },
      {
        _id: 'intern-2',
        name: 'Priya Singh',
        roleTitle: 'Design System & UI Intern',
        department: 'Product & Design',
        startDate: '2026-07-01',
        endDate: '2026-12-31',
        mentorName: 'Riya Patel',
        progressPercentage: 50,
        rating: 'Excellent (9.1/10)',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      },
    ];

    res.status(200).json({ success: true, interns });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Shortlisted Candidates
// @route   GET /api/companies/shortlisted
// @access  Private (Company)
exports.getShortlistedCandidates = async (req, res, next) => {
  try {
    let company = await Company.findOne({ user: req.user.id });
    let applications = [];
    if (company) {
      applications = await Application.find({ company: company._id, status: 'Shortlisted' });
    }
    if (applications.length === 0) {
      applications = [
        { _id: 'app-s1', studentName: 'Harsh Gajre', studentEmail: 'harsh@campus2career.com', studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', opportunityTitle: 'Frontend Developer Intern', matchScore: 94, skills: ['React', 'JavaScript', 'Tailwind CSS'], collegeName: 'MIT Institute of Technology', cgpa: 8.9, status: 'Shortlisted', appliedDate: '2026-08-28' },
        { _id: 'app-s2', studentName: 'Priya Singh', studentEmail: 'priya@example.com', studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', opportunityTitle: 'UI/UX Product Designer', matchScore: 91, skills: ['Figma', 'Design Systems', 'React'], collegeName: 'Apex Institute of Technology', cgpa: 9.2, status: 'Shortlisted', appliedDate: '2026-08-25' },
      ];
    }
    res.status(200).json({ success: true, shortlisted: applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Skill Requirements
// @route   GET /api/companies/skill-requirements
// @access  Private (Company)
exports.getSkillRequirements = async (req, res, next) => {
  try {
    const skillRequirements = [
      { skill: 'React.js', demandScore: 94, candidatesWithSkill: 1120, priority: 'Critical' },
      { skill: 'Node.js & Express', demandScore: 91, candidatesWithSkill: 940, priority: 'Critical' },
      { skill: 'TypeScript', demandScore: 89, candidatesWithSkill: 680, priority: 'High' },
      { skill: 'Docker & Kubernetes', demandScore: 88, candidatesWithSkill: 520, priority: 'High' },
      { skill: 'Python / FastAPI', demandScore: 86, candidatesWithSkill: 820, priority: 'Medium' },
      { skill: 'SQL & Database Design', demandScore: 85, candidatesWithSkill: 760, priority: 'Medium' },
    ];
    res.status(200).json({ success: true, skillRequirements });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Opportunity
// @route   PUT /api/companies/opportunities/:id
// @access  Private (Company)
exports.updateOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ success: false, message: 'Opportunity not found' });
    const fields = ['title', 'type', 'location', 'locationType', 'stipend', 'duration', 'deadline', 'description', 'openingsCount', 'status', 'requiredSkills', 'preferredSkills'];
    fields.forEach((f) => { if (req.body[f] !== undefined) opportunity[f] = req.body[f]; });
    await opportunity.save();
    res.status(200).json({ success: true, message: 'Opportunity updated', opportunity });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Opportunity
// @route   DELETE /api/companies/opportunities/:id
// @access  Private (Company)
exports.deleteOpportunity = async (req, res, next) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Opportunity deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Application Status (by company)
// @route   PUT /api/companies/applications/:id/status
// @access  Private (Company)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    application.status = status;
    await application.save();
    res.status(200).json({ success: true, message: 'Application status updated', application });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Company Profile
// @route   GET /api/companies/profile
// @access  Private (Company)
exports.getCompanyProfile = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id }).populate('user', 'name email avatar phone');
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });
    res.status(200).json({ success: true, company });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Company Profile
// @route   PUT /api/companies/profile
// @access  Private (Company)
exports.updateCompanyProfile = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });
    const fields = ['companyName', 'industryType', 'location', 'website', 'hrName', 'hrDesignation', 'description', 'founded', 'teamSize'];
    fields.forEach((f) => { if (req.body[f] !== undefined) company[f] = req.body[f]; });
    await company.save();
    res.status(200).json({ success: true, message: 'Company profile updated', company });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Company Challenges
// @route   GET /api/companies/challenges
// @access  Private (Company)
exports.getCompanyChallenges = async (req, res, next) => {
  try {
    let challenges = await Challenge.find().sort({ createdAt: -1 });
    if (challenges.length === 0) {
      challenges = [
        { _id: 'ch-1', title: 'React & Tailwind Enterprise Dashboard', difficulty: 'Intermediate', category: 'Frontend Development', requiredSkills: ['React', 'Tailwind CSS', 'Recharts'], deadline: '1w left', prizePoints: '₹25,000 + Direct Interview Call', participantsCount: 142, status: 'active' },
        { _id: 'ch-2', title: 'High-Concurrency Rate Limiter in Node.js', difficulty: 'Advanced', category: 'Backend Systems', requiredSkills: ['Node.js', 'Redis', 'Docker'], deadline: '4d left', prizePoints: '₹35,000 + Internship Offer', participantsCount: 88, status: 'active' },
      ];
    }
    res.status(200).json({ success: true, challenges });
  } catch (error) {
    next(error);
  }
};
