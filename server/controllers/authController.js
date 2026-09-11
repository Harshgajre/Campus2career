const User = require('../models/User');
const Student = require('../models/Student');
const College = require('../models/College');
const Company = require('../models/Company');
const generateToken = require('../utils/generateToken');
const { extractTextFromFile, parseResumeData } = require('../utils/resumeParser');
const { categorizeSkill } = require('../utils/skillCategorizer');
const axios = require('axios');
const crypto = require('crypto');

// In-memory store for DigiLocker OAuth state parameters (use Redis in production)
const digiLockerStates = new Map();

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

// ─── DigiLocker OAuth 2.0 ─────────────────────────────────────────────────────

const DIGILOCKER_AUTH_URL = 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize';
const DIGILOCKER_TOKEN_URL = 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/token';
const DIGILOCKER_USER_URL = 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/user';

// @desc    Initiate DigiLocker OAuth 2.0 flow (Student only)
// @route   GET /api/auth/digilocker
// @access  Public
exports.initiateDigiLocker = (req, res) => {
  const clientId = process.env.DIGILOCKER_CLIENT_ID;
  const redirectUri = process.env.DIGILOCKER_REDIRECT_URI;

  if (!clientId || clientId === 'YOUR_CLIENT_ID_HERE') {
    return res.status(503).json({
      success: false,
      message: 'DigiLocker integration is not configured. Please set DIGILOCKER_CLIENT_ID in server .env',
    });
  }

  // Generate a random state parameter for CSRF protection
  const state = crypto.randomBytes(32).toString('hex');
  digiLockerStates.set(state, { createdAt: Date.now() });

  // Clean up expired states (older than 10 minutes)
  for (const [key, val] of digiLockerStates) {
    if (Date.now() - val.createdAt > 10 * 60 * 1000) {
      digiLockerStates.delete(key);
    }
  }

  const authUrl = `${DIGILOCKER_AUTH_URL}?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

  res.redirect(authUrl);
};

// @desc    DigiLocker OAuth callback — exchange code, fetch profile, login student
// @route   GET /api/auth/digilocker/callback
// @access  Public (called by DigiLocker redirect)
exports.digiLockerCallback = async (req, res) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

  try {
    const { code, state, error: dlError, error_description } = req.query;

    // DigiLocker returned an error
    if (dlError) {
      console.error('DigiLocker auth error:', dlError, error_description);
      return res.redirect(`${clientUrl}/login/student?digilocker_error=${encodeURIComponent(error_description || dlError)}`);
    }

    // Validate code and state
    if (!code || !state) {
      return res.redirect(`${clientUrl}/login/student?digilocker_error=${encodeURIComponent('Missing authorization code or state parameter')}`);
    }

    // Verify state to prevent CSRF
    if (!digiLockerStates.has(state)) {
      return res.redirect(`${clientUrl}/login/student?digilocker_error=${encodeURIComponent('Invalid or expired state. Please try again.')}`);
    }
    digiLockerStates.delete(state);

    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      DIGILOCKER_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DIGILOCKER_REDIRECT_URI,
        client_id: process.env.DIGILOCKER_CLIENT_ID,
        client_secret: process.env.DIGILOCKER_CLIENT_SECRET,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const { access_token } = tokenResponse.data;
    if (!access_token) {
      return res.redirect(`${clientUrl}/login/student?digilocker_error=${encodeURIComponent('Failed to obtain access token from DigiLocker')}`);
    }

    // Fetch user profile from DigiLocker
    const profileResponse = await axios.get(DIGILOCKER_USER_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const dlProfile = profileResponse.data;
    // DigiLocker profile typically has: digilockerid, name, dob, gender, mobile, email, eaadhaar
    const dlEmail = dlProfile.email;
    const dlName = dlProfile.name;
    const dlDigiLockerId = dlProfile.digilockerid;

    if (!dlEmail && !dlDigiLockerId) {
      return res.redirect(`${clientUrl}/login/student?digilocker_error=${encodeURIComponent('DigiLocker did not return sufficient identity data')}`);
    }

    // Find existing student user by email (or digilockerid stored on user)
    let user = null;
    if (dlEmail) {
      user = await User.findOne({ email: dlEmail.toLowerCase(), role: 'student' });
    }

    if (!user) {
      return res.redirect(`${clientUrl}/login/student?digilocker_error=${encodeURIComponent('No student account found with this DigiLocker email. Please register first with the same email, then connect DigiLocker.')}`);
    }

    if (user.status === 'suspended') {
      return res.redirect(`${clientUrl}/login/student?digilocker_error=${encodeURIComponent('Your account has been suspended. Please contact support.')}`);
    }

    // Issue C2C JWT token for the student
    const token = generateToken(user._id, user.role);

    // Redirect to frontend with token
    res.redirect(`${clientUrl}/login/student?digilocker_token=${token}`);
  } catch (error) {
    console.error('DigiLocker callback error:', error.response?.data || error.message);
    const errMsg = error.response?.data?.error_description || error.response?.data?.message || 'DigiLocker authentication failed. Please try again.';
    const clientUrl2 = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl2}/login/student?digilocker_error=${encodeURIComponent(errMsg)}`);
  }
};
