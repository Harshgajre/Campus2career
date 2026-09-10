const Student = require('../models/Student');
const User = require('../models/User');
const Project = require('../models/Project');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const Challenge = require('../models/Challenge');
const Notification = require('../models/Notification');
const { categorizeSkill } = require('../utils/skillCategorizer');

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatTimeAgo = (date) => {
  if (!date) return '';
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
};

const formatDeadline = (date) => {
  const diffMs = new Date(date).getTime() - Date.now();
  if (diffMs <= 0) return 'Expired';
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return '1d left';
  if (diffDays < 7) return `${diffDays}d left`;
  const diffWeeks = Math.ceil(diffDays / 7);
  return `${diffWeeks}w left`;
};

// Build radar metrics from student skills grouped by category
const buildRadarMetrics = (skills) => {
  const categoryMap = {
    'Frontend': 0,
    'Backend': 0,
    'Data Science & AI': 0,
    'DevOps & Cloud': 0,
    'Core CS': 0,
    'Mobile': 0,
    'UI/UX': 0,
    'Other': 0,
  };
  const counts = { ...categoryMap };

  skills.forEach((sk) => {
    const cat = sk.category || 'Other';
    if (categoryMap[cat] !== undefined) {
      categoryMap[cat] += sk.score || 0;
      counts[cat] += 1;
    }
  });

  const subjectLabels = {
    'Frontend': 'Frontend',
    'Backend': 'Backend',
    'Data Science & AI': 'Data & AI',
    'DevOps & Cloud': 'DevOps',
    'Core CS': 'Core CS',
    'UI/UX': 'UI/UX',
  };

  return Object.keys(subjectLabels)
    .map((cat) => ({
      subject: subjectLabels[cat],
      A: counts[cat] > 0 ? Math.round(categoryMap[cat] / counts[cat]) : 0,
      fullMark: 100,
    }))
    .filter((m) => m.A > 0);
};

// Milestones for a given skill name
const buildMilestones = (skillName, weekNum) => [
  { name: `Learn core fundamentals of ${skillName}`, done: false },
  { name: `Build a mini project using ${skillName}`, done: false },
  { name: `Practice interview questions on ${skillName}`, done: false },
  { name: `Add ${skillName} to your Skill Passport`, done: false },
];

// Derive career track label from skill categories
const deriveCareerTrack = (skills) => {
  if (!skills || skills.length === 0) return 'Full Stack Developer';
  const cats = skills.map((s) => s.category || 'Other');
  const hasFrontend = cats.includes('Frontend');
  const hasBackend = cats.includes('Backend');
  const hasAI = cats.includes('Data Science & AI');
  const hasDevOps = cats.includes('DevOps & Cloud');
  if (hasAI) return 'AI/ML Engineer';
  if (hasDevOps && hasBackend) return 'Cloud Backend Engineer';
  if (hasFrontend && hasBackend) return 'Full Stack Developer';
  if (hasFrontend) return 'Frontend Developer';
  if (hasBackend) return 'Backend Developer';
  return 'Software Developer';
};

// ─── Controllers ─────────────────────────────────────────────────────────────

// @desc    Get Student Dashboard Data
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
    });

    // Real recent activity: last 3 applications by this student
    const recentApplications = await Application.find({ student: student._id })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const recentActivity = recentApplications.map((app) => ({
      id: app._id.toString(),
      title: `Applied for ${app.opportunityTitle || 'an opportunity'}${app.companyName ? ` at ${app.companyName}` : ''}`,
      time: formatTimeAgo(app.createdAt),
      type: 'application',
      status: app.status,
    }));

    // Real upcoming opportunities from DB
    const openOpportunities = await Opportunity.find({ status: 'open' })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const upcomingOpportunities = openOpportunities.map((opp) => ({
      id: opp._id.toString(),
      title: opp.title,
      company: opp.companyName || '',
      deadline: opp.deadline ? formatDeadline(opp.deadline) : 'Open',
      type: opp.type || 'Internship',
      stipend: opp.stipend || opp.salary || '',
      skills: opp.requiredSkills || [],
    }));

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
// @desc    Get All Student Skills (real skills from resume + GitHub repos)
// @route   GET /api/students/skills
// @access  Private (Student)
exports.getStudentSkills = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const rawSkillNames = new Set();

    // 1. From student.skills in DB
    (student.skills || []).forEach((sk) => {
      if (sk && sk.name && sk.name.trim()) rawSkillNames.add(sk.name.trim());
    });

    // 2. From extracted resume data
    (student.extractedResumeData?.skills || []).forEach((name) => {
      if (name && typeof name === 'string' && name.trim()) rawSkillNames.add(name.trim());
    });

    // 3. From student's GitHub repos (if githubUrl provided)
    const githubMatch = student.githubUrl?.match(/^https:\/\/(?:www\.)?github\.com\/([A-Za-z0-9-]+)\/?$/i);
    if (githubMatch) {
      try {
        const response = await fetch(`https://api.github.com/users/${githubMatch[1]}/repos?sort=updated&per_page=100`, {
          headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'Campus2Career' },
        });
        if (response.ok) {
          const repos = await response.json();
          repos.forEach((r) => {
            if (r.language && typeof r.language === 'string') rawSkillNames.add(r.language.trim());
          });
        }
      } catch (_) {}
    }

    // Deduplicate case-insensitively and accurately categorize
    const seen = new Map();
    Array.from(rawSkillNames).forEach((name) => {
      const key = name.toLowerCase();
      if (!seen.has(key)) {
        seen.set(key, {
          name,
          category: categorizeSkill(name),
          level: 'Intermediate',
        });
      }
    });

    const uniqueSkills = Array.from(seen.values());

    // Save back to DB to maintain consistency
    student.skills = uniqueSkills;
    await student.save();

    res.status(200).json({ success: true, skills: uniqueSkills });
  } catch (error) {
    next(error);
  }
};

// @desc    Add New Skill to Student Profile
// @route   POST /api/students/skills
// @access  Private (Student)
exports.addStudentSkill = async (req, res, next) => {
  try {
    const { name, category, level } = req.body;
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      student = await Student.create({
        user: req.user.id,
        skills: [],
      });
    }

    const assignedCategory = category && category !== 'Other' ? category : categorizeSkill(name);

    const newSkill = {
      name,
      category: assignedCategory,
      level: level || 'Intermediate',
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

// @desc    Get Digital Skill Passport (real student data only)
// @route   GET /api/students/passport
// @access  Private (Student)
exports.getStudentPassport = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id }).populate('user', 'name email avatar phone');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const skills = student.skills || [];

    const certifications = (student.extractedResumeData?.certifications || []).map((c) => ({
      title: typeof c === 'string' ? c : c.title || c.name || String(c),
      issuer: c.issuer || c.organization || '',
      date: c.date || c.year || '',
    }));

    const passportData = {
      passportId: student.passportId || '',
      studentName: student.user?.name || '',
      email: student.user?.email || '',
      phone: student.user?.phone || '',
      rollNumber: student.rollNumber || '',
      avatar: student.user?.avatar || '',
      collegeName: student.collegeName || '',
      department: student.department || '',
      skills: skills.map((sk) => ({
        name: sk.name,
        category: sk.category || 'Other',
        level: sk.level || 'Intermediate',
      })),
      certifications,
    };

    res.status(200).json({ success: true, passport: passportData });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Student Learning Roadmap (dynamic, based on actual skills)
// @route   GET /api/students/roadmap
// @access  Private (Student)
exports.getStudentRoadmap = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });

    const skills = student.skills || [];

    // No skills → return empty roadmap so frontend can show empty state
    if (skills.length === 0) {
      return res.status(200).json({
        success: true,
        roadmap: {
          careerTrack: '',
          overallCompletion: 0,
          recommendedSkills: [],
          modules: [],
          curatedResources: [],
        },
      });
    }

    // Take up to 4 skills (sorted by score desc) — Week N = Skill N
    const roadmapSkills = [...skills]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 4);

    const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    const modules = roadmapSkills.map((skill, idx) => ({
      id: `mod-${idx + 1}`,
      title: `${weekLabels[idx]}: ${skill.name}`,
      status: 'upcoming',
      progress: 0,
      milestones: buildMilestones(skill.name, idx + 1),
    }));

    const careerTrack = deriveCareerTrack(skills);

    // Recommended skills = common skills not already in the student's list
    const allSkillNames = skills.map((s) => s.name.toLowerCase());
    const commonSkills = [
      'System Design', 'Docker', 'AWS', 'TypeScript', 'GraphQL', 'Redis',
      'Next.js', 'PostgreSQL', 'Kubernetes', 'CI/CD', 'React', 'Node.js',
    ];
    const recommendedSkills = commonSkills
      .filter((s) => !allSkillNames.includes(s.toLowerCase()))
      .slice(0, 4);

    const curatedResources = [
      { title: 'Full Stack Open', provider: 'University of Helsinki', type: 'Course', free: true, url: 'https://fullstackopen.com' },
      { title: 'System Design Primer', provider: 'GitHub Open Source', type: 'Guide', free: true, url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'Roadmap.sh', provider: 'roadmap.sh', type: 'Roadmap', free: true, url: 'https://roadmap.sh' },
    ];

    // Overall completion: average of module progress (all 0 since freshly generated)
    const overallCompletion = 0;

    res.status(200).json({
      success: true,
      roadmap: {
        careerTrack,
        overallCompletion,
        recommendedSkills,
        modules,
        curatedResources,
      },
    });
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
      coverNote: coverNote || '',
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
