const College = require('../models/College');
const Student = require('../models/Student');
const TrainingProgram = require('../models/TrainingProgram');
const Internship = require('../models/Internship');
const Placement = require('../models/Placement');
const Notification = require('../models/Notification');

// @desc    Get College Dashboard Data (Exact metrics from Reference Image)
// @route   GET /api/colleges/dashboard
// @access  Private (College)
exports.getCollegeDashboard = async (req, res, next) => {
  try {
    let college = await College.findOne({ user: req.user ? req.user.id : null });

    const totalStudents = college ? college.totalStudents : 1245;
    const activePrograms = college ? college.activePrograms : 32;
    const internshipsCount = college ? college.internshipsCount : 85;
    const placementsCount = college ? college.placementsCount : 62;

    // Spline / Bar chart skill analytics data matching College Panel in image
    const skillAnalytics = [
      { skill: 'AI/ML', count: 380, averageScore: 78 },
      { skill: 'Web Dev', count: 1120, averageScore: 89 },
      { skill: 'DSA', count: 850, averageScore: 82 },
      { skill: 'DBMS', count: 940, averageScore: 85 },
      { skill: 'Cloud', count: 520, averageScore: 74 },
    ];

    // Recent Updates list (Matching Reference design items)
    const recentUpdates = [
      {
        id: 'up-1',
        title: 'New Training Program added',
        time: '2h ago',
        category: 'training',
        icon: 'book-open',
      },
      {
        id: 'up-2',
        title: 'Internship Drive - TechCorp',
        time: '1d ago',
        category: 'internship',
        icon: 'briefcase',
      },
      {
        id: 'up-3',
        title: 'Placement Drive - TCS',
        time: '2d ago',
        category: 'placement',
        icon: 'award',
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        welcomeMessage: 'Welcome, Dr. Mehta! 🎓',
        subtitle: 'Monitor students and improve outcomes.',
        stats: {
          totalStudents: { count: '1,245', numeric: totalStudents, label: 'Total Students' },
          activePrograms: { count: '32', numeric: activePrograms, label: 'Active Programs' },
          internships: { count: '85', numeric: internshipsCount, label: 'Internships' },
          placements: { count: '62', numeric: placementsCount, label: 'Placements' },
        },
        skillAnalytics,
        recentUpdates,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Students Roster
// @route   GET /api/colleges/students
// @access  Private (College)
exports.getCollegeStudents = async (req, res, next) => {
  try {
    const students = [
      {
        _id: 'stu-1',
        name: 'Harsh Gajre',
        rollNumber: 'STU-2024-001',
        department: 'Computer Science',
        semester: 6,
        cgpa: 8.9,
        topSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
        verifiedSkillsCount: 10,
        employabilityScore: 88,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        internshipStatus: 'Shortlisted @ TechCorp',
      },
      {
        _id: 'stu-2',
        name: 'Priya Singh',
        rollNumber: 'STU-2024-015',
        department: 'Information Technology',
        semester: 6,
        cgpa: 9.2,
        topSkills: ['Figma', 'UI/UX', 'React', 'CSS3'],
        verifiedSkillsCount: 8,
        employabilityScore: 92,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        internshipStatus: 'Active Intern @ DesignStudio',
      },
      {
        _id: 'stu-3',
        name: 'Dev Mehta',
        rollNumber: 'STU-2024-042',
        department: 'Computer Science',
        semester: 6,
        cgpa: 8.5,
        topSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
        verifiedSkillsCount: 9,
        employabilityScore: 84,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        internshipStatus: 'Interviewing @ CodeSoft',
      },
      {
        _id: 'stu-4',
        name: 'Ananya Sharma',
        rollNumber: 'STU-2024-078',
        department: 'AI & Data Science',
        semester: 6,
        cgpa: 9.4,
        topSkills: ['PyTorch', 'Machine Learning', 'Python', 'SQL'],
        verifiedSkillsCount: 11,
        employabilityScore: 94,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
        internshipStatus: 'Placed @ Microsoft (32 LPA)',
      },
      {
        _id: 'stu-5',
        name: 'Rohan Gupta',
        rollNumber: 'STU-2024-099',
        department: 'Computer Science',
        semester: 6,
        cgpa: 7.8,
        topSkills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
        verifiedSkillsCount: 6,
        employabilityScore: 78,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        internshipStatus: 'Looking for Opportunities',
      },
    ];

    res.status(200).json({ success: true, students });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Detailed Skill Analytics
// @route   GET /api/colleges/skill-analytics
// @access  Private (College)
exports.getCollegeSkillAnalytics = async (req, res, next) => {
  try {
    const departmentDistribution = [
      { name: 'Computer Science', students: 540, topSkill: 'Full Stack Web' },
      { name: 'Information Technology', students: 360, topSkill: 'Cloud & DevOps' },
      { name: 'AI & Data Science', students: 210, topSkill: 'Machine Learning' },
      { name: 'Electronics & Comm.', students: 135, topSkill: 'Embedded & IoT' },
    ];

    const proficiencyDistribution = [
      { level: 'Expert', count: 185, color: '#10B981' },
      { level: 'Advanced', count: 480, color: '#3B82F6' },
      { level: 'Intermediate', count: 420, color: '#8B5CF6' },
      { level: 'Beginner', count: 160, color: '#F97316' },
    ];

    const trendGrowth = [
      { month: 'Jan', WebDev: 800, AIML: 210, Cloud: 340, DSA: 620 },
      { month: 'Feb', WebDev: 890, AIML: 260, Cloud: 380, DSA: 690 },
      { month: 'Mar', WebDev: 940, AIML: 300, Cloud: 420, DSA: 740 },
      { month: 'Apr', WebDev: 1010, AIML: 330, Cloud: 460, DSA: 790 },
      { month: 'May', WebDev: 1080, AIML: 360, Cloud: 490, DSA: 820 },
      { month: 'Jun', WebDev: 1120, AIML: 380, Cloud: 520, DSA: 850 },
    ];

    res.status(200).json({
      success: true,
      analytics: {
        departmentDistribution,
        proficiencyDistribution,
        trendGrowth,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Skill Gap Matrix & Recommendations
// @route   GET /api/colleges/skill-gap
// @access  Private (College)
exports.getSkillGap = async (req, res, next) => {
  try {
    const gaps = [
      {
        skill: 'Docker & Kubernetes (Cloud Native)',
        industryDemand: 92,
        studentProficiency: 44,
        gapPercentage: 48,
        priority: 'Critical',
        recommendedProgram: 'Hands-on Cloud DevOps Bootcamp',
      },
      {
        skill: 'Next.js & Server Side Rendering',
        industryDemand: 88,
        studentProficiency: 52,
        gapPercentage: 36,
        priority: 'High',
        recommendedProgram: 'Production Full-Stack Next.js 14 Workshop',
      },
      {
        skill: 'System Design & High-Scalability',
        industryDemand: 85,
        studentProficiency: 55,
        gapPercentage: 30,
        priority: 'High',
        recommendedProgram: 'Architecting Distributed Systems masterclass',
      },
      {
        skill: 'Generative AI & LLM Prompt Pipelines',
        industryDemand: 79,
        studentProficiency: 41,
        gapPercentage: 38,
        priority: 'High',
        recommendedProgram: 'AI-Powered Application Engineering',
      },
      {
        skill: 'TypeScript in Modern JavaScript',
        industryDemand: 90,
        studentProficiency: 68,
        gapPercentage: 22,
        priority: 'Medium',
        recommendedProgram: 'Strict Mode Enterprise TypeScript Course',
      },
    ];

    res.status(200).json({ success: true, gaps });
  } catch (error) {
    next(error);
  }
};

// @desc    Get & Manage Training Programs
// @route   GET /api/colleges/training-programs
// @access  Private (College)
exports.getTrainingPrograms = async (req, res, next) => {
  try {
    let programs = await TrainingProgram.find().sort({ createdAt: -1 });

    if (programs.length === 0) {
      programs = [
        {
          _id: 'prog-1',
          title: 'Full Stack Cloud Native Engineering',
          description: 'Comprehensive 8-week industrial program focusing on Docker, Microservices, and MERN stack.',
          skillsCovered: ['React', 'Node.js', 'Docker', 'Kubernetes', 'CI/CD'],
          department: 'Computer Science & IT',
          trainerName: 'Dr. R. K. Sharma (Ex-Google / Industry Expert)',
          startDate: '2026-09-15',
          endDate: '2026-11-30',
          durationWeeks: 8,
          enrolledCount: 140,
          maxCapacity: 150,
          progress: 45,
          status: 'active',
        },
        {
          _id: 'prog-2',
          title: 'Generative AI & Applied Machine Learning',
          description: 'Hands-on practical deployment of LLMs, LangChain, RAG architecture, and fine-tuning models.',
          skillsCovered: ['PyTorch', 'Python', 'LangChain', 'FastAPI', 'VectorDB'],
          department: 'AI & Data Science',
          trainerName: 'Pooja Verma (Lead AI Scientist)',
          startDate: '2026-09-20',
          endDate: '2026-11-20',
          durationWeeks: 6,
          enrolledCount: 95,
          maxCapacity: 100,
          progress: 20,
          status: 'active',
        },
        {
          _id: 'prog-3',
          title: 'Enterprise Cyber Security & Penetration Testing',
          description: 'Network security, vulnerability assessments, OWASP top 10 remediation, and ethical hacking.',
          skillsCovered: ['Ethical Hacking', 'OWASP', 'Linux Security', 'Wireshark'],
          department: 'Information Technology',
          trainerName: 'Vikram Sengupta (CISO Advisor)',
          startDate: '2026-10-01',
          endDate: '2026-12-01',
          durationWeeks: 8,
          enrolledCount: 75,
          maxCapacity: 80,
          progress: 0,
          status: 'upcoming',
        },
      ];
    }

    res.status(200).json({ success: true, programs });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Training Program
// @route   POST /api/colleges/training-programs
// @access  Private (College)
exports.createTrainingProgram = async (req, res, next) => {
  try {
    const { title, description, skillsCovered, department, trainerName, startDate, endDate, maxCapacity } = req.body;

    const skillsArray = Array.isArray(skillsCovered)
      ? skillsCovered
      : skillsCovered ? skillsCovered.split(',').map((s) => s.trim()) : ['Cloud', 'DevOps'];

    const program = await TrainingProgram.create({
      title,
      description,
      skillsCovered: skillsArray,
      department: department || 'Computer Science',
      trainerName: trainerName || 'Industry Mentor',
      startDate: startDate || '2026-09-20',
      endDate: endDate || '2026-11-20',
      maxCapacity: maxCapacity || 100,
      enrolledCount: 1,
    });

    res.status(201).json({ success: true, message: 'Training program created successfully', program });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Industry Collaborations
// @route   GET /api/colleges/collaborations
// @access  Private (College)
exports.getIndustryCollaborations = async (req, res, next) => {
  try {
    const collaborations = [
      {
        id: 'collab-1',
        companyName: 'TechCorp Solutions',
        partnerType: 'Campus Hiring & Lab Sponsorship',
        status: 'Active MoU',
        internsHired: 24,
        establishedYear: '2024',
        contactPerson: 'Riya Patel',
        logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=120',
      },
      {
        id: 'collab-2',
        companyName: 'DesignStudio Innovations',
        partnerType: 'Design Hackathon & Mentorship',
        status: 'Active MoU',
        internsHired: 12,
        establishedYear: '2025',
        contactPerson: 'Karan Mehra',
        logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=120',
      },
      {
        id: 'collab-3',
        companyName: 'CodeSoft Global',
        partnerType: 'Joint Curriculum & Internship Pipeline',
        status: 'Active MoU',
        internsHired: 18,
        establishedYear: '2023',
        contactPerson: 'Sanjay Deshmukh',
        logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=120',
      },
    ];

    res.status(200).json({ success: true, collaborations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Placements & Internships Data
// @route   GET /api/colleges/placements
// @access  Private (College)
exports.getCollegePlacements = async (req, res, next) => {
  try {
    const stats = {
      totalPlaced: 62,
      averagePackageLPA: 12.4,
      highestPackageLPA: 32.0,
      placementRatePercent: 94.2,
      topRecruiters: ['TechCorp', 'Microsoft', 'CodeSoft', 'Amazon', 'TCS Digital'],
    };

    const recentPlacements = [
      { studentName: 'Ananya Sharma', company: 'Microsoft', packageLPA: 32.0, department: 'AI & Data Science', date: 'Aug 2026' },
      { studentName: 'Dev Mehta', company: 'TechCorp Solutions', packageLPA: 18.5, department: 'Computer Science', date: 'Aug 2026' },
      { studentName: 'Priya Singh', company: 'DesignStudio', packageLPA: 16.0, department: 'Information Technology', date: 'Jul 2026' },
      { studentName: 'Sameer Kulkarni', company: 'Amazon AWS', packageLPA: 28.0, department: 'Computer Science', date: 'Jul 2026' },
      { studentName: 'Kavita Joshi', company: 'CodeSoft Global', packageLPA: 14.5, department: 'Information Technology', date: 'Jun 2026' },
    ];

    res.status(200).json({ success: true, stats, recentPlacements });
  } catch (error) {
    next(error);
  }
};
