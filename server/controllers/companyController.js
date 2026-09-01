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
        welcomeMessage: 'Welcome, Riya! 💼',
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
    let opportunities = await Opportunity.find().sort({ createdAt: -1 });

    if (opportunities.length === 0) {
      opportunities = [
        {
          _id: 'opp-1',
          title: 'Frontend Developer Intern',
          companyName: 'TechCorp Solutions',
          type: 'Internship',
          location: 'Bangalore (Hybrid)',
          locationType: 'Hybrid',
          stipend: '₹35,000 / month',
          duration: '6 Months',
          deadline: '5d left',
          requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
          preferredSkills: ['Next.js', 'Redux Toolkit', 'Jest'],
          description: 'Build modern user-facing web applications with React 18, Tailwind, and performant state pipelines.',
          openingsCount: 4,
          applicationsCount: 48,
          status: 'open',
        },
        {
          _id: 'opp-2',
          title: 'Full Stack Engineer (MERN)',
          companyName: 'TechCorp Solutions',
          type: 'Job',
          location: 'Bangalore / Remote',
          locationType: 'Remote',
          stipend: '₹14 - 18 LPA',
          duration: 'Full Time',
          deadline: '12d left',
          requiredSkills: ['Node.js', 'Express', 'React', 'MongoDB', 'AWS'],
          preferredSkills: ['Docker', 'Microservices', 'GraphQL'],
          description: 'Design and deploy scalable backend microservices, REST endpoints, and dynamic React frontends.',
          openingsCount: 3,
          applicationsCount: 76,
          status: 'open',
        },
        {
          _id: 'opp-3',
          title: 'DevOps & Cloud Engineer Intern',
          companyName: 'TechCorp Solutions',
          type: 'Internship',
          location: 'Pune / On-site',
          locationType: 'On-site',
          stipend: '₹30,000 / month',
          duration: '6 Months',
          deadline: '3d left',
          requiredSkills: ['Docker', 'Kubernetes', 'Linux', 'CI/CD'],
          preferredSkills: ['Terraform', 'AWS Lambda', 'Prometheus'],
          description: 'Maintain cloud clusters, configure GitHub Actions automated pipelines, and manage container deployments.',
          openingsCount: 2,
          applicationsCount: 32,
          status: 'open',
        },
      ];
    }

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

    let company = await Company.findOne({ user: req.user.id });
    if (!company) {
      company = await Company.create({ user: req.user.id, companyName: 'TechCorp Solutions' });
    }

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
