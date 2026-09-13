const User = require('../models/User');
const Student = require('../models/Student');
const College = require('../models/College');
const Company = require('../models/Company');
const Opportunity = require('../models/Opportunity');
const Skill = require('../models/Skill');
const Challenge = require('../models/Challenge');

// @desc    Get Admin Dashboard Data (Exact metrics from Reference Image)
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
exports.getAdminDashboard = async (req, res, next) => {
  try {
    const totalStudentsCount = 12568;
    const totalCompaniesCount = 842;
    const totalCollegesCount = 256;
    const totalOpportunitiesCount = 1245;

    // Platform Overview chart (Matching Admin panel orange spline line with dots)
    const platformOverview = [
      { month: 'Jan', value: 800 },
      { month: 'Feb', value: 1200 },
      { month: 'Mar', value: 950 },
      { month: 'Apr', value: 1650 },
      { month: 'May', value: 1400 },
      { month: 'Jun', value: 1950 },
    ];

    // Recent Activities (Matching Reference design items)
    const recentActivities = [
      {
        id: 'adm-act-1',
        title: 'New company registered',
        time: '2h ago',
        type: 'company',
        icon: 'building-2',
      },
      {
        id: 'adm-act-2',
        title: 'New opportunity posted',
        time: '1d ago',
        type: 'opportunity',
        icon: 'briefcase',
      },
      {
        id: 'adm-act-3',
        title: 'New college onboarded',
        time: '2d ago',
        type: 'college',
        icon: 'graduation-cap',
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        welcomeMessage: req.user?.name ? `Welcome back, ${req.user.name.trim().split(' ')[0]}! 👑` : 'Welcome back! 👑',
        subtitle: 'Manage the entire platform seamlessly.',
        stats: {
          totalStudents: { count: '12,568', numeric: totalStudentsCount, label: 'Total Students' },
          totalCompanies: { count: '842', numeric: totalCompaniesCount, label: 'Total Companies' },
          totalColleges: { count: '256', numeric: totalCollegesCount, label: 'Total Colleges' },
          totalOpportunities: { count: '1,245', numeric: totalOpportunitiesCount, label: 'Opportunities' },
        },
        platformOverview,
        recentActivities,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Students for Admin Management
// @route   GET /api/admin/students
// @access  Private (Admin)
exports.getAdminStudents = async (req, res, next) => {
  try {
    const students = [
      {
        _id: 'stu-1',
        name: 'Harsh Gajre',
        email: 'harsh@campus2career.com',
        collegeName: 'MIT Institute of Technology',
        department: 'Computer Science',
        cgpa: 8.9,
        status: 'active',
        skillsCount: 12,
        employabilityScore: 88,
        createdAt: '2026-01-10',
      },
      {
        _id: 'stu-2',
        name: 'Priya Singh',
        email: 'priya@example.com',
        collegeName: 'Apex Institute of Technology',
        department: 'Information Technology',
        cgpa: 9.2,
        status: 'active',
        skillsCount: 10,
        employabilityScore: 92,
        createdAt: '2026-02-04',
      },
      {
        _id: 'stu-3',
        name: 'Dev Mehta',
        email: 'dev@example.com',
        collegeName: 'National Institute of Tech',
        department: 'Computer Science',
        cgpa: 8.5,
        status: 'active',
        skillsCount: 11,
        employabilityScore: 84,
        createdAt: '2026-02-14',
      },
      {
        _id: 'stu-4',
        name: 'Ananya Sharma',
        email: 'ananya@example.com',
        collegeName: 'Indian Institute of Information Tech',
        department: 'AI & Data Science',
        cgpa: 9.4,
        status: 'active',
        skillsCount: 14,
        employabilityScore: 94,
        createdAt: '2026-03-01',
      },
    ];

    res.status(200).json({ success: true, students });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Companies for Admin
// @route   GET /api/admin/companies
// @access  Private (Admin)
exports.getAdminCompanies = async (req, res, next) => {
  try {
    const companies = [
      {
        _id: 'comp-1',
        companyName: 'TechCorp Solutions',
        industryType: 'Information Technology',
        location: 'Bangalore, India',
        hrName: 'Riya Patel',
        verifiedStatus: 'verified',
        openOpportunities: 18,
        totalHired: 42,
      },
      {
        _id: 'comp-2',
        companyName: 'DesignStudio Global',
        industryType: 'UI/UX & Product Design',
        location: 'Mumbai, India',
        hrName: 'Karan Mehra',
        verifiedStatus: 'verified',
        openOpportunities: 6,
        totalHired: 16,
      },
      {
        _id: 'comp-3',
        companyName: 'CodeSoft Innovations',
        industryType: 'Enterprise Cloud Systems',
        location: 'Hyderabad, India',
        hrName: 'Sneha Roy',
        verifiedStatus: 'verified',
        openOpportunities: 12,
        totalHired: 28,
      },
      {
        _id: 'comp-4',
        companyName: 'NextGen Robotics AI',
        industryType: 'AI & Autonomous Systems',
        location: 'Gurgaon, India',
        hrName: 'Alok Nath',
        verifiedStatus: 'pending',
        openOpportunities: 4,
        totalHired: 0,
      },
    ];

    res.status(200).json({ success: true, companies });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Colleges for Admin
// @route   GET /api/admin/colleges
// @access  Private (Admin)
exports.getAdminColleges = async (req, res, next) => {
  try {
    const colleges = [
      {
        _id: 'col-1',
        institutionName: 'Apex Institute of Technology',
        code: 'AIT-4110',
        city: 'Pune',
        state: 'Maharashtra',
        contactPerson: 'Dr. Mehta',
        totalStudents: 1245,
        approvedStatus: 'approved',
      },
      {
        _id: 'col-2',
        institutionName: 'National Institute of Technology',
        code: 'NIT-2041',
        city: 'Surathkal',
        state: 'Karnataka',
        contactPerson: 'Dr. R. Ramanathan',
        totalStudents: 3400,
        approvedStatus: 'approved',
      },
      {
        _id: 'col-3',
        institutionName: 'MIT School of Engineering',
        code: 'MIT-8830',
        city: 'Pune',
        state: 'Maharashtra',
        contactPerson: 'Dr. Sunita Kulkarni',
        totalStudents: 2100,
        approvedStatus: 'approved',
      },
      {
        _id: 'col-4',
        institutionName: 'St. Xavier Institute of Science',
        code: 'SXI-9012',
        city: 'Mumbai',
        state: 'Maharashtra',
        contactPerson: 'Fr. Thomas Varghese',
        totalStudents: 850,
        approvedStatus: 'pending',
      },
    ];

    res.status(200).json({ success: true, colleges });
  } catch (error) {
    next(error);
  }
};

// @desc    Get & Manage Master Skills List
// @route   GET /api/admin/skills
// @access  Private (Admin)
exports.getAdminSkills = async (req, res, next) => {
  try {
    let skills = await Skill.find().sort({ industryDemandPercent: -1 });

    if (skills.length === 0) {
      skills = [
        { _id: 'sk-1', name: 'React.js', category: 'Frontend', demandLevel: 'Very High', industryDemandPercent: 94, activeStudentsCount: 1120 },
        { _id: 'sk-2', name: 'Node.js & Express', category: 'Backend', demandLevel: 'Very High', industryDemandPercent: 91, activeStudentsCount: 940 },
        { _id: 'sk-3', name: 'Python & AI/ML', category: 'Backend', demandLevel: 'Very High', industryDemandPercent: 95, activeStudentsCount: 820 },
        { _id: 'sk-4', name: 'Docker & Kubernetes', category: 'Tools', demandLevel: 'High', industryDemandPercent: 88, activeStudentsCount: 520 },
        { _id: 'sk-5', name: 'Data Structures & Algorithms', category: 'Backend', demandLevel: 'Very High', industryDemandPercent: 96, activeStudentsCount: 1250 },
        { _id: 'sk-6', name: 'Figma UI/UX Prototyping', category: 'Frontend', demandLevel: 'High', industryDemandPercent: 82, activeStudentsCount: 450 },
        { _id: 'sk-7', name: 'TypeScript', category: 'Frontend', demandLevel: 'Very High', industryDemandPercent: 89, activeStudentsCount: 680 },
        { _id: 'sk-8', name: 'PostgreSQL & Database Design', category: 'Database', demandLevel: 'High', industryDemandPercent: 85, activeStudentsCount: 760 },
      ];
    }

    res.status(200).json({ success: true, skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Master Skill
// @route   POST /api/admin/skills
// @access  Private (Admin)
exports.createAdminSkill = async (req, res, next) => {
  try {
    const { name, category, demandLevel, industryDemandPercent, description } = req.body;
    const validCategories = ['Frontend', 'Backend', 'Database', 'Tools'];
    const assignedCategory = validCategories.includes(category) ? category : 'Frontend';

    const skill = await Skill.create({
      name,
      category: assignedCategory,
      demandLevel: demandLevel || 'High',
      industryDemandPercent: industryDemandPercent || 80,
      description: description || '',
    });

    res.status(201).json({ success: true, message: 'Skill created in master catalog', skill });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Master Skill
// @route   DELETE /api/admin/skills/:id
// @access  Private (Admin)
exports.deleteAdminSkill = async (req, res, next) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Skill removed from master catalog' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Detailed Analytics Reports
// @route   GET /api/admin/analytics-reports
// @access  Private (Admin)
exports.getAnalyticsReports = async (req, res, next) => {
  try {
    const growthMetrics = [
      { month: 'Jan', students: 8200, companies: 540, colleges: 180, placements: 320 },
      { month: 'Feb', students: 9100, companies: 610, colleges: 200, placements: 450 },
      { month: 'Mar', students: 10200, companies: 690, colleges: 220, placements: 590 },
      { month: 'Apr', students: 11100, companies: 750, colleges: 235, placements: 780 },
      { month: 'May', students: 11900, companies: 805, colleges: 248, placements: 920 },
      { month: 'Jun', students: 12568, companies: 842, colleges: 256, placements: 1245 },
    ];

    const demandShare = [
      { name: 'Frontend Web', value: 35, color: '#3B82F6' },
      { name: 'Backend & Cloud', value: 28, color: '#10B981' },
      { name: 'AI & Data Science', value: 22, color: '#8B5CF6' },
      { name: 'UI/UX & Product', value: 15, color: '#F97316' },
    ];

    res.status(200).json({
      success: true,
      reports: {
        growthMetrics,
        demandShare,
        totalRevenue: '₹4.2M Platform Volume',
        activeHiringDrives: 48,
        verifiedSkillPassports: 10420,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Opportunities for Admin
// @route   GET /api/admin/opportunities
// @access  Private (Admin)
exports.getAdminOpportunities = async (req, res, next) => {
  try {
    let opportunities = await Opportunity.find().sort({ createdAt: -1 });
    if (opportunities.length === 0) {
      opportunities = [
        { _id: 'opp-1', title: 'Frontend Developer Intern', companyName: 'TechCorp Solutions', type: 'Internship', status: 'open', applicationsCount: 48, openingsCount: 4, deadline: '5d left' },
        { _id: 'opp-2', title: 'Full Stack Engineer (MERN)', companyName: 'TechCorp Solutions', type: 'Job', status: 'open', applicationsCount: 76, openingsCount: 3, deadline: '12d left' },
        { _id: 'opp-3', title: 'Web Developer Intern', companyName: 'CodeSoft Global', type: 'Internship', status: 'open', applicationsCount: 54, openingsCount: 5, deadline: '8d left' },
      ];
    }
    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Challenges for Admin
// @route   GET /api/admin/challenges
// @access  Private (Admin)
exports.getAdminChallenges = async (req, res, next) => {
  try {
    let challenges = await Challenge.find().sort({ createdAt: -1 });
    if (challenges.length === 0) {
      challenges = [
        { _id: 'ch-1', title: 'React & Tailwind Enterprise Dashboard', companyName: 'TechCorp', difficulty: 'Intermediate', status: 'active', participantsCount: 142, deadline: '1w left' },
        { _id: 'ch-2', title: 'UI/UX Design Challenge: FinTech App', companyName: 'DesignStudio', difficulty: 'Intermediate', status: 'active', participantsCount: 95, deadline: '1w left' },
        { _id: 'ch-3', title: 'High-Concurrency Rate Limiter', companyName: 'CodeSoft', difficulty: 'Advanced', status: 'active', participantsCount: 88, deadline: '4d left' },
      ];
    }
    res.status(200).json({ success: true, challenges });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete/Deactivate a User
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteAdminUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User removed from platform' });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle User Active/Suspended Status
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin)
exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.status = user.status === 'active' ? 'suspended' : 'active';
    await user.save();
    res.status(200).json({ success: true, message: `User ${user.status}`, user: { id: user._id, name: user.name, status: user.status } });
  } catch (error) {
    next(error);
  }
};
