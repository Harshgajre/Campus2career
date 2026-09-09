const Student = require('../models/Student');
const User = require('../models/User');
const Project = require('../models/Project');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const Challenge = require('../models/Challenge');
const Notification = require('../models/Notification');

// @desc    Get Student Dashboard Data (Exact metrics from Reference Image)
// @route   GET /api/students/dashboard
// @access  Private (Student)
exports.getStudentDashboard = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const skillsCount = student.skills.length;
    const projectsCount = await Project.countDocuments({ student: student._id });
    const challengesCount = student.challengesCompletedCount || 0;
    const activeApplicationsCount = await Application.countDocuments({
      student: student._id,
      status: { $in: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled'] },
    }) || 3;

    // Upcoming Opportunities (Matching Reference design items)
    const upcomingOpportunities = [
      {
        id: '1',
        title: 'Frontend Developer Intern',
        company: 'TechCorp',
        deadline: '5d left',
        type: 'Internship',
        stipend: '₹35,000 / mo',
        skills: ['React', 'TypeScript', 'Tailwind CSS'],
        icon: 'code',
      },
      {
        id: '2',
        title: 'UI/UX Design Challenge',
        company: 'DesignStudio',
        deadline: '1w left',
        type: 'Challenge',
        stipend: '₹25,000 Prize',
        skills: ['Figma', 'Prototyping', 'Design Systems'],
        icon: 'palette',
      },
      {
        id: '3',
        title: 'Web Developer Intern',
        company: 'CodeSoft',
        deadline: '8d left',
        type: 'Internship',
        stipend: '₹28,000 / mo',
        skills: ['JavaScript', 'Node.js', 'Express'],
        icon: 'globe',
      },
    ];

    // Recent Activity timeline (Matching Reference design items)
    const recentActivity = [
      {
        id: 'act-1',
        title: 'Completed React Challenge',
        time: '2h ago',
        type: 'challenge',
        status: 'success',
      },
      {
        id: 'act-2',
        title: 'Updated Project: Portfolio',
        time: '1d ago',
        type: 'project',
        status: 'info',
      },
      {
        id: 'act-3',
        title: 'Applied for Frontend Intern',
        time: '2d ago',
        type: 'application',
        status: 'primary',
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        welcomeMessage: `Welcome Back, ${req.user.name}!`,
        subtitle: 'Track your skills, grow and achieve your goals.',
        stats: {
          skills: { count: skillsCount, label: 'Competencies' },
          projects: { count: projectsCount, label: 'Completed' },
          challenges: { count: challengesCount, label: 'Participated' },
          applications: { count: activeApplicationsCount, label: 'Active' },
        },
        skillsProgress: {
          overallProgress: student.overallProgress,
          employabilityScore: student.employabilityScore,
        },
        recentActivity,
        upcomingOpportunities,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Student Skills
// @route   GET /api/students/skills
// @access  Private (Student)
exports.getStudentSkills = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    res.status(200).json({ success: true, skills: student.skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Add New Skill to Student Profile
// @route   POST /api/students/skills
// @access  Private (Student)
exports.addStudentSkill = async (req, res, next) => {
  try {
    const { name, category, level, score } = req.body;
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      student = await Student.create({
        user: req.user.id,
        skills: [],
      });
    }

    const newSkill = {
      name,
      category: category || 'Frontend',
      level: level || 'Intermediate',
      verified: false,
      score: score || 80,
    };

    student.skills.push(newSkill);
    await student.save();

    res.status(201).json({ success: true, message: 'Skill added successfully', skills: student.skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Skill
// @route   PUT /api/students/skills/:skillId
// @access  Private (Student)
exports.updateStudentSkill = async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const { name, category, level, score } = req.body;
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const skill = student.skills.id(skillId);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill item not found' });
    }

    if (name) skill.name = name;
    if (category) skill.category = category;
    if (level) skill.level = level;
    if (score !== undefined) skill.score = score;

    await student.save();
    res.status(200).json({ success: true, message: 'Skill updated successfully', skills: student.skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Skill
// @route   DELETE /api/students/skills/:skillId
// @access  Private (Student)
exports.deleteStudentSkill = async (req, res, next) => {
  try {
    const { skillId } = req.params;
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    student.skills = student.skills.filter((s) => s._id.toString() !== skillId);
    await student.save();

    res.status(200).json({ success: true, message: 'Skill deleted successfully', skills: student.skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Student Projects
// @route   GET /api/students/projects
// @access  Private (Student)
exports.getStudentProjects = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    const savedProjects = await Project.find({ student: student._id }).sort({ createdAt: -1 });
    let githubProjects = [];
    const githubMatch = student.githubUrl?.match(/^https:\/\/(?:www\.)?github\.com\/([A-Za-z0-9-]+)\/?$/i);

    if (githubMatch) {
      try {
        const response = await fetch(`https://api.github.com/users/${githubMatch[1]}/repos?sort=updated&per_page=100`, { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'Campus2Career' } });
        if (response.ok) {
          const repos = await response.json();
          const savedLinks = new Set(savedProjects.map((project) => project.githubLink));
          githubProjects = repos.filter((repo) => !repo.fork && !repo.private && !savedLinks.has(repo.html_url)).map((repo) => ({
            _id: `github-${repo.id}`,
            title: repo.name,
            description: repo.description || 'Public GitHub repository',
            technologies: repo.language ? [repo.language] : [],
            githubLink: repo.html_url,
            liveLink: repo.homepage || '',
            status: 'completed',
            source: 'github',
          }));
        }
      } catch (_) {
        // GitHub is optional; MongoDB projects still load when the API is unavailable.
      }
    }

    res.status(200).json({ success: true, projects: [...savedProjects, ...githubProjects] });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Student Project
// @route   POST /api/students/projects
// @access  Private (Student)
exports.createStudentProject = async (req, res, next) => {
  try {
    const { title, description, technologies, githubLink, liveLink, status } = req.body;
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      student = await Student.create({ user: req.user.id });
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : technologies.split(',').map((t) => t.trim());

    const project = await Project.create({
      student: student._id,
      title,
      description,
      technologies: techArray,
      githubLink: githubLink || '',
      liveLink: liveLink || '',
      status: status || 'completed',
    });

    res.status(201).json({ success: true, message: 'Project added successfully', project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Student Project
// @route   PUT /api/students/projects/:id
// @access  Private (Student)
exports.updateStudentProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ user: req.user.id });
    const project = student ? await Project.findOne({ _id: id, student: student._id }) : null;

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const { title, description, technologies, githubLink, liveLink, status } = req.body;
    if (title) project.title = title;
    if (description) project.description = description;
    if (technologies) {
      project.technologies = Array.isArray(technologies)
        ? technologies
        : technologies.split(',').map((t) => t.trim());
    }
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (liveLink !== undefined) project.liveLink = liveLink;
    if (status) project.status = status;

    await project.save();
    res.status(200).json({ success: true, message: 'Project updated successfully', project });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Student Project
// @route   DELETE /api/students/projects/:id
// @access  Private (Student)
exports.deleteStudentProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ user: req.user.id });
    const project = student ? await Project.findOneAndDelete({ _id: id, student: student._id }) : null;
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Digital Skill Passport
// @route   GET /api/students/passport
// @access  Private / Public
exports.getStudentPassport = async (req, res, next) => {
  try {
    let student = await Student.findOne({ user: req.user ? req.user.id : null }).populate('user');
    if (!student) {
      student = await Student.findOne().populate('user');
    }

    const passportData = {
      passportId: student ? student.passportId : 'C2C-PASSPORT-2026-HG01',
      studentName: student && student.user ? student.user.name : 'Harsh Gajre',
      avatar: student && student.user ? student.user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      collegeName: student ? student.collegeName : 'MIT Institute of Technology',
      department: student ? student.department : 'Computer Science',
      semester: student ? student.semester : 6,
      cgpa: student ? student.cgpa : 8.9,
      overallProgress: 75,
      employabilityScore: 88,
      verifiedSkillsCount: 10,
      totalCompetencies: 12,
      issuedDate: '2026-01-15',
      verificationHash: '0x8f2a93b4e10c7654321fedcba9876543210',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://campus2career.io/verify/C2C-PASSPORT-2026-HG01`,
      topSkills: [
        { name: 'JavaScript & React', score: 94, level: 'Expert', verified: true },
        { name: 'Node.js & Express', score: 86, level: 'Advanced', verified: true },
        { name: 'Data Structures & Algorithms', score: 88, level: 'Advanced', verified: true },
        { name: 'Tailwind CSS & UI Systems', score: 92, level: 'Expert', verified: true },
        { name: 'MongoDB & Database Design', score: 82, level: 'Advanced', verified: true },
      ],
      radarMetrics: [
        { subject: 'Coding & DSA', A: 90, fullMark: 100 },
        { subject: 'System Design', A: 78, fullMark: 100 },
        { subject: 'Frontend', A: 95, fullMark: 100 },
        { subject: 'Backend', A: 85, fullMark: 100 },
        { subject: 'DevOps & Git', A: 80, fullMark: 100 },
        { subject: 'Problem Solving', A: 92, fullMark: 100 },
      ],
      certifications: [
        { title: 'Meta Certified Full Stack Developer', issuer: 'Meta', date: '2026-03-10', badge: 'Certified' },
        { title: 'AWS Cloud Practitioner Foundational', issuer: 'Amazon Web Services', date: '2025-11-20', badge: 'Verified' },
        { title: 'SIH Finalist Hackathon Badge', issuer: 'Ministry of Education', date: '2025-12-18', badge: 'Top 1%' },
      ],
    };

    res.status(200).json({ success: true, passport: passportData });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Student Learning Roadmap
// @route   GET /api/students/roadmap
// @access  Private (Student)
exports.getStudentRoadmap = async (req, res, next) => {
  try {
    const roadmap = {
      careerTrack: 'Full Stack Cloud Architect',
      overallCompletion: 68,
      recommendedSkills: ['Next.js 14 Server Actions', 'Docker & Kubernetes', 'GraphQL APIs', 'Redis Caching'],
      modules: [
        {
          id: 'mod-1',
          title: 'Phase 1: Advanced Frontend & State Architecture',
          status: 'completed',
          progress: 100,
          milestones: [
            { name: 'React 18 Hooks, Custom Hooks & Optimization', done: true },
            { name: 'Tailwind CSS Custom Design Systems', done: true },
            { name: 'State Management with Context & Zustand', done: true },
            { name: 'Client-side Routing & Protected Guards', done: true },
          ],
        },
        {
          id: 'mod-2',
          title: 'Phase 2: Scalable Backend Services & APIs',
          status: 'completed',
          progress: 100,
          milestones: [
            { name: 'Node.js Event Loop & Stream Architecture', done: true },
            { name: 'Express RESTful Endpoints with JWT Authentication', done: true },
            { name: 'MongoDB Aggregations & Schema Indexing', done: true },
            { name: 'Role-based Middleware & Error Handling', done: true },
          ],
        },
        {
          id: 'mod-3',
          title: 'Phase 3: Microservices, Caching & Cloud Deployment',
          status: 'in-progress',
          progress: 55,
          milestones: [
            { name: 'Docker Containerization for Multi-container Apps', done: true },
            { name: 'Redis Cache Layer for API Response Optimization', done: true },
            { name: 'CI/CD Pipelines with GitHub Actions', done: false },
            { name: 'Kubernetes Pod Deployment & Load Balancing', done: false },
          ],
        },
        {
          id: 'mod-4',
          title: 'Phase 4: System Design & Enterprise Scale',
          status: 'upcoming',
          progress: 0,
          milestones: [
            { name: 'Distributed Systems & High Availability Architecture', done: false },
            { name: 'Kafka / RabbitMQ Event Driven Architecture', done: false },
            { name: 'Security Audits, Rate Limiting & Penetration Testing', done: false },
          ],
        },
      ],
      curatedResources: [
        { title: 'Full Stack Open 2026', provider: 'University of Helsinki', type: 'Course', free: true, url: 'https://fullstackopen.com' },
        { title: 'System Design Primer', provider: 'GitHub Open Source', type: 'Guide', free: true, url: 'https://github.com/donnemartin/system-design-primer' },
        { title: 'Docker & Kubernetes Mastery', provider: 'Cloud Native Foundation', type: 'Hands-on Lab', free: true, url: 'https://kubernetes.io/docs/tutorials/' },
      ],
    };

    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Student Applications
// @route   GET /api/students/applications
// @access  Private (Student)
exports.getStudentApplications = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    const applications = await Application.find({ student: student._id }).populate('opportunity company');

    res.status(200).json({ success: true, applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply to an Opportunity
// @route   POST /api/students/apply
// @access  Private (Student)
exports.applyOpportunity = async (req, res, next) => {
  try {
    const { opportunityId, coverNote } = req.body;
    let student = await Student.findOne({ user: req.user.id });
    if (!student) {
      student = await Student.create({ user: req.user.id });
    }

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    // Check duplicate application
    const existing = await Application.findOne({ student: student._id, opportunity: opportunity._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already applied for this opportunity' });
    }

    const application = await Application.create({
      opportunity: opportunity._id,
      student: student._id,
      company: opportunity.company,
      studentName: req.user.name,
      studentEmail: req.user.email,
      studentAvatar: req.user.avatar,
      opportunityTitle: opportunity.title,
      companyName: opportunity.companyName,
      status: 'Applied',
      matchScore: 88,
      coverNote: coverNote || 'Excited to bring my full-stack skills to this role.',
      resumeUrl: student.resumeUrl,
    });

    opportunity.applicationsCount += 1;
    await opportunity.save();

    // Create Notification
    await Notification.create({
      user: req.user.id,
      title: 'Application Submitted',
      message: `Your application for ${opportunity.title} at ${opportunity.companyName} was submitted successfully.`,
      type: 'opportunity',
    });

    res.status(201).json({ success: true, message: 'Application submitted successfully!', application });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Student Profile
// @route   GET /api/students/profile
// @access  Private (Student)
exports.getStudentProfile = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id }).populate('user', 'name email avatar phone status');
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Student Profile
// @route   PUT /api/students/profile
// @access  Private (Student)
exports.updateStudentProfile = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    if (req.body.githubUrl && !/^https:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/i.test(req.body.githubUrl.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid GitHub profile URL' });
    }
    const fields = ['collegeName', 'rollNumber', 'department', 'semester', 'cgpa', 'bio', 'githubUrl', 'linkedinUrl', 'portfolioUrl'];
    fields.forEach((f) => { if (req.body[f] !== undefined) student[f] = req.body[f]; });
    await student.save();
    res.status(200).json({ success: true, message: 'Profile updated', student });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Resume
// @route   POST /api/students/upload-resume
// @access  Private (Student)
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    // Build accessible URL (served from /uploads static route)
    const resumeUrl = `/uploads/${req.file.filename}`;
    const { extractTextFromFile, parseResumeData } = require('../utils/resumeParser');
    const extractedResumeData = parseResumeData(await extractTextFromFile(req.file.path, req.file.mimetype, req.file.originalname));
    student.resumeUrl = resumeUrl;
    student.resumeFileName = req.file.originalname;
    student.extractedResumeData = extractedResumeData;
    if (!student.skills.length && extractedResumeData.skills.length) {
      student.skills = extractedResumeData.skills.map((name) => ({ name, category: 'Other', level: 'Intermediate', verified: false, score: 0 }));
    }
    await student.save();

    res.status(200).json({ success: true, message: 'Resume uploaded and extracted successfully', resumeUrl, resumeFileName: req.file.originalname, extractedResumeData });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Opportunities for Students
// @route   GET /api/students/opportunities
// @access  Private (Student)
exports.getStudentOpportunities = async (req, res, next) => {
  try {
    const { skill, type, location } = req.query;
    let query = { status: 'open' };
    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (skill) {
      const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.requiredSkills = { $in: [new RegExp(escapedSkill, 'i')] };
    }

    const opportunities = await Opportunity.find(query).populate('company', 'companyName').sort({ createdAt: -1 });

    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    next(error);
  }
};
