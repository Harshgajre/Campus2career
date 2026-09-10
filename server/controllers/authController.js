const User = require('../models/User');
const Student = require('../models/Student');
const College = require('../models/College');
const Company = require('../models/Company');
const generateToken = require('../utils/generateToken');
const { extractTextFromFile, parseResumeData } = require('../utils/resumeParser');
const { categorizeSkill } = require('../utils/skillCategorizer');

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
    const { name, email, password, phone, rollNumber, department, semester, collegeName, skills, githubUrl, resumeUrl, resumeFileName, extractedResumeData } = req.body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit Indian phone number' });
    }

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
      phone: phone.trim(),
      role: 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    });

    // Build skills from submitted data or extracted resume — no fake defaults
    let formattedSkills = [];
    if (Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'object') {
      formattedSkills = skills.map(s => ({
        ...s,
        category: s.category && s.category !== 'Other' ? s.category : categorizeSkill(s.name),
      }));
    } else if (Array.isArray(skills) && skills.length > 0) {
      formattedSkills = skills.map(s => ({
        name: s,
        category: categorizeSkill(s),
        level: 'Intermediate',
        verified: false,
        score: 75,
      }));
    } else if (extractedResumeData?.skills && extractedResumeData.skills.length > 0) {
      formattedSkills = extractedResumeData.skills.map(s => ({
        name: s,
        category: categorizeSkill(s),
        level: 'Intermediate',
        verified: false,
        score: 75,
      }));
    }
    // If no skills provided, student starts with empty skills — they can add via My Skills page

    const student = await Student.create({
      user: user._id,
      rollNumber: rollNumber || '',
      department: department || 'Computer Science',
      semester: semester || 6,
      collegeName: collegeName || (extractedResumeData?.college || ''),
      skills: formattedSkills,
      overallProgress: 0,
      employabilityScore: 0,
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
        phone: user.phone,
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
    const { name, email, password, companyName, gstNumber, industryType, location, website } = req.body;

    if (!gstNumber || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber.trim().toUpperCase())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 15-character GST Number (e.g. 22AAAAA0000A1Z5)' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: name || 'HR Representative',
      email,
      password,
      role: 'company',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(companyName || name)}`,
    });

    const company = await Company.create({
      user: user._id,
      companyName: companyName || name,
      gstNumber: gstNumber.trim().toUpperCase(),
      industryType: industryType || 'Information Technology & Software',
      location: location || 'India',
      website: website || '',
      hrName: name || 'HR Representative',
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

// @desc    Role-isolated & Universal Login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(401).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Role-based login isolation check
    if (role && user.role !== role) {
      const roleLabels = {
        student: 'Student',
        college: 'College / University',
        company: 'Company / Industry',
        admin: 'Administrator',
      };
      const expectedLabel = roleLabels[role] || role;
      return res.status(401).json({
        success: false,
        message: `Account is not registered as a ${expectedLabel}. Please use the correct login portal.`,
      });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
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
