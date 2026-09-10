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
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });

    // Real counts from DB
    const openOpportunitiesCount = await Opportunity.countDocuments({ company: company._id, status: 'open' });
    const totalCandidatesCount = await Application.countDocuments({ company: company._id });
    const shortlistedCount = await Application.countDocuments({ company: company._id, status: 'Shortlisted' });
    const interviewsCount = await Interview.countDocuments({ company: company._id });

    // Real applications overview: count applications by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const monthlyApps = await Application.aggregate([
      { $match: { company: company._id, createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $month: '$createdAt' }, applications: { $sum: 1 } } },
      { $sort: { '_id': 1 } },
    ]);
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const applicationsOverview = monthlyApps.map(m => ({
      month: monthNames[(m._id - 1) % 12],
      applications: m.applications,
    }));

    // Real recent applications
    const recentRaw = await Application.find({ company: company._id })
      .sort({ createdAt: -1 }).limit(5).lean();
    const recentApplications = recentRaw.map(app => ({
      id: app._id.toString(),
      name: app.studentName,
      role: app.opportunityTitle,
      time: (() => {
        const diff = Math.floor((Date.now() - new Date(app.createdAt)) / 60000);
        if (diff < 60) return `${diff}m ago`;
        if (diff < 1440) return `${Math.floor(diff/60)}h ago`;
        return `${Math.floor(diff/1440)}d ago`;
      })(),
      avatar: app.studentAvatar || '',
      status: app.status,
    }));

    res.status(200).json({
      success: true,
      data: {
        welcomeMessage: `Welcome Back, ${req.user.name}!`,
        subtitle: 'Find and hire the best talent for your company.',
        stats: {
          openOpportunities: { count: String(openOpportunitiesCount), numeric: openOpportunitiesCount, label: 'Open Opportunities' },
          totalCandidates: { count: String(totalCandidatesCount), numeric: totalCandidatesCount, label: 'Total Candidates' },
          shortlisted: { count: String(shortlistedCount), numeric: shortlistedCount, label: 'Shortlisted' },
          interviews: { count: String(interviewsCount), numeric: interviewsCount, label: 'Interviews' },
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

// @desc    Search Candidates & Talent Pool (real registered students)
// @route   GET /api/companies/candidates
// @access  Private (Company)
exports.searchCandidates = async (req, res, next) => {
  try {
    const students = await Student.find()
      .populate('user', 'name email avatar phone')
      .lean();

    const candidates = students
      .filter(s => s.user) // only students with a linked user
      .map(s => ({
        _id: s._id.toString(),
        name: s.user.name || '',
        email: s.user.email || '',
        phone: s.user.phone || '',
        avatar: s.user.avatar || '',
        collegeName: s.collegeName || '',
        department: s.department || '',
        cgpa: s.cgpa || null,
        employabilityScore: s.employabilityScore || 0,
        overallProgress: s.overallProgress || 0,
        skills: (s.skills || []).map(sk => ({
          name: sk.name,
          level: sk.level,
          verified: sk.verified,
          score: sk.score,
        })),
        resumeUrl: s.resumeUrl || '',
        resumeFileName: s.resumeFileName || '',
        projectsCount: 0,
        challengesWon: s.challengesCompletedCount || 0,
        shortlisted: false,
        matchPercent: null,
      }));

    res.status(200).json({ success: true, candidates });
  } catch (error) {
    next(error);
  }
};

// @desc    Get & Manage Interviews (real data only)
// @route   GET /api/companies/interviews
// @access  Private (Company)
exports.getCompanyInterviews = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });
    const interviews = await Interview.find({ company: company._id }).sort({ createdAt: -1 });
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

// @desc    Get Active Interns (real data only)
// @route   GET /api/companies/interns
// @access  Private (Company)
exports.getActiveInterns = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });
    const interns = await Internship.find({ company: company._id, status: 'Active' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, interns });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Shortlisted Candidates (real data only)
// @route   GET /api/companies/shortlisted
// @access  Private (Company)
exports.getShortlistedCandidates = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });
    const applications = await Application.find({ company: company._id, status: 'Shortlisted' }).sort({ createdAt: -1 });
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

// @desc    Get Company Challenges (company-scoped, real data only)
// @route   GET /api/companies/challenges
// @access  Private (Company)
exports.getCompanyChallenges = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });
    const challenges = await Challenge.find({ company: company._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, challenges });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Company Challenge
// @route   POST /api/companies/challenges
// @access  Private (Company)
exports.createChallenge = async (req, res, next) => {
  try {
    const { title, description, difficulty, category, requiredSkills, deadline, prizePoints } = req.body;

    const company = await Company.findOne({ user: req.user.id });
    if (!company) return res.status(404).json({ success: false, message: 'Company profile not found' });

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const skillsArray = Array.isArray(requiredSkills)
      ? requiredSkills
      : requiredSkills ? requiredSkills.split(',').map(s => s.trim()).filter(Boolean) : [];

    const challenge = await Challenge.create({
      company: company._id,
      companyName: company.companyName,
      title,
      description,
      difficulty: difficulty || 'Intermediate',
      category: category || 'General',
      requiredSkills: skillsArray,
      deadline: deadline || '1w left',
      prizePoints: prizePoints || 'To be announced',
      status: 'active',
    });

    res.status(201).json({ success: true, message: 'Challenge created successfully', challenge });
  } catch (error) {
    next(error);
  }
};
