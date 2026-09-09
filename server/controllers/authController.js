const User = require('../models/User');
const Student = require('../models/Student');
const College = require('../models/College');
const Company = require('../models/Company');
const generateToken = require('../utils/generateToken');
const { extractTextFromFile, parseResumeData } = require('../utils/resumeParser');

// @desc    Parse Resume PDF/DOCX
// @route   POST /api/auth/parse-resume
// @access  Public
exports.parseResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a resume file' });
    }

    const rawText = await extractTextFromFile(req.file.path, req.file.mimetype, req.file.originalname);
    const parsedData = parseResumeData(rawText);
    const resumeUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      resumeUrl,
      resumeFileName: req.file.originalname,
      data: parsedData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register Student
// @route   POST /api/auth/register-student
// @access  Public
exports.registerStudent = async (req, res, next) => {
  try {
    const { name, email, password, rollNumber, department, semester, collegeName, bio, skills, githubUrl, resumeUrl, resumeFileName, extractedResumeData } = req.body;

    if (githubUrl && !/^https:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/i.test(githubUrl.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid GitHub profile URL' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    });

    let formattedSkills = [];
    if (Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'object') {
      formattedSkills = skills;
    } else if (Array.isArray(skills) && skills.length > 0) {
      formattedSkills = skills.map(s => ({
        name: s,
        category: 'Frontend',
        level: 'Intermediate',
        verified: true,
        score: 85
      }));
    } else if (extractedResumeData?.skills && extractedResumeData.skills.length > 0) {
      formattedSkills = extractedResumeData.skills.map(s => ({
        name: s,
        category: 'Frontend',
        level: 'Intermediate',
        verified: true,
        score: 85
      }));
    } else {
      formattedSkills = [
        { name: 'JavaScript', category: 'Frontend', level: 'Advanced', verified: true, score: 90 },
        { name: 'React', category: 'Frontend', level: 'Advanced', verified: true, score: 88 },
        { name: 'Node.js', category: 'Backend', level: 'Intermediate', verified: true, score: 82 },
        { name: 'MongoDB', category: 'Backend', level: 'Intermediate', verified: true, score: 80 },
      ];
    }

    const student = await Student.create({
      user: user._id,
      rollNumber: rollNumber || 'STU-' + Math.floor(1000 + Math.random() * 9000),
      department: department || 'Computer Science',
      semester: semester || 6,
      collegeName: collegeName || (extractedResumeData?.college || 'MIT Institute of Technology'),
      bio: bio || (extractedResumeData?.rawText ? extractedResumeData.rawText.slice(0, 150) + '...' : 'Aspiring software engineer excited to learn and build real-world software.'),
      skills: formattedSkills,
      overallProgress: 75,
      employabilityScore: 85,
      githubUrl: githubUrl?.trim() || '',
      resumeUrl: resumeUrl || '',
      resumeFileName: resumeFileName || '',
      extractedResumeData: extractedResumeData || {},
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register College
// @route   POST /api/auth/register-college
// @access  Public
exports.registerCollege = async (req, res, next) => {
  try {
    const { name, email, password, institutionName, code, university, state, city } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: name || 'Dr. Mehta',
      email,
      password,
      role: 'college',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    });

    const college = await College.create({
      user: user._id,
      institutionName: institutionName || 'Apex Institute of Technology',
      code: code || 'AIT-' + Math.floor(1000 + Math.random() * 9000),
      university: university || 'State Technological University',
      state: state || 'Maharashtra',
      city: city || 'Pune',
      contactPerson: name || 'Dr. Mehta',
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      college,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register Company
// @route   POST /api/auth/register-company
// @access  Public
exports.registerCompany = async (req, res, next) => {
  try {
    const { name, email, password, companyName, industryType, location, website } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: name || 'Riya Patel',
      email,
      password,
      role: 'company',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    });

    const company = await Company.create({
      user: user._id,
      companyName: companyName || 'TechCorp Solutions',
      industryType: industryType || 'Information Technology & Software',
      location: location || 'Bangalore, India',
      website: website || 'https://techcorp.example.com',
      hrName: name || 'Riya Patel',
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Universal Login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    let roleDetails = null;
    if (user.role === 'student') {
      roleDetails = await Student.findOne({ user: user._id });
    } else if (user.role === 'college') {
      roleDetails = await College.findOne({ user: user._id });
    } else if (user.role === 'company') {
      roleDetails = await Company.findOne({ user: user._id });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        status: user.status,
        themePreference: user.themePreference,
      },
      roleDetails,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    let roleDetails = null;

    if (user.role === 'student') {
      roleDetails = await Student.findOne({ user: user._id });
    } else if (user.role === 'college') {
      roleDetails = await College.findOne({ user: user._id });
    } else if (user.role === 'company') {
      roleDetails = await Company.findOne({ user: user._id });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        status: user.status,
        themePreference: user.themePreference,
      },
      roleDetails,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile & theme preference
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, avatar, themePreference } = req.body;
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;
    if (themePreference) user.themePreference = themePreference;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        status: user.status,
        themePreference: user.themePreference,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Quick Demo Login
// @route   POST /api/auth/demo-login
// @access  Public
exports.demoLogin = async (req, res, next) => {
  try {
    const { role } = req.body;
    let targetEmail = 'harsh@campus2career.com';

    if (role === 'college') targetEmail = 'mehta@campus2career.com';
    else if (role === 'company') targetEmail = 'riya@techcorp.com';
    else if (role === 'admin') targetEmail = 'admin@campus2career.com';

    let user = await User.findOne({ email: targetEmail });
    if (!user) {
      user = await User.findOne({ role });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: `Demo user for role ${role} not found. Please run seed script.` });
    }

    let roleDetails = null;
    if (user.role === 'student') {
      roleDetails = await Student.findOne({ user: user._id });
    } else if (user.role === 'college') {
      roleDetails = await College.findOne({ user: user._id });
    } else if (user.role === 'company') {
      roleDetails = await Company.findOne({ user: user._id });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        status: user.status,
        themePreference: user.themePreference,
      },
      roleDetails,
    });
  } catch (error) {
    next(error);
  }
};
