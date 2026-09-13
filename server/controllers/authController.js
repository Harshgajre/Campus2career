const User = require('../models/User');
const Student = require('../models/Student');
const College = require('../models/College');
const Company = require('../models/Company');
const Otp = require('../models/Otp');
const generateToken = require('../utils/generateToken');
const { extractTextFromFile, parseResumeData } = require('../utils/resumeParser');
const { categorizeSkill } = require('../utils/skillCategorizer');
const { SKILL_CATEGORIES } = require('../utils/skillCategories');
const { generateOTP, hashOTP, verifyOTPHash, sendSMSOTP } = require('../utils/otpService');

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
    const {
      name,
      email,
      password,
      phone,
      rollNumber,
      department,
      semester,
      collegeName,
      skills,
      githubUrl,
      resumeUrl,
      resumeFileName,
      extractedResumeData,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your full name' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const cleanPhone = phone ? String(phone).trim() : '';
    if (!cleanPhone || !/^\d{10}$/.test(cleanPhone)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit phone number' });
    }

    const cleanRollNumber = rollNumber ? String(rollNumber).trim() : '';
    if (!cleanRollNumber) {
      return res.status(400).json({ success: false, message: 'Please provide your roll number' });
    }

    const cleanCollegeName = collegeName ? String(collegeName).trim() : '';
    if (!cleanCollegeName) {
      return res.status(400).json({ success: false, message: 'Please provide your college/university name' });
    }

    const cleanDepartment = department ? String(department).trim() : 'Computer Science';

    if (githubUrl && !/^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/i.test(githubUrl.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid GitHub profile URL (e.g. https://github.com/username)' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    // Query the same User model and role that registration creates.  Do not
    // inspect local storage, seed data, or unrelated role profiles.
    const existingUser = await User.findOne({ email: normalizedEmail, role: 'student' });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'A student account already exists with this email' });
    }

    if (!resumeUrl || !resumeFileName) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF or DOCX resume' });
    }

    const college = await College.findOne({ institutionName: { $regex: `^${cleanCollegeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } });

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: cleanPhone,
      role: 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
    });

    try {
      const validCategories = SKILL_CATEGORIES;
      let formattedSkills = [];
      if (Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'object') {
        formattedSkills = skills.map(s => ({
          ...s,
          category: validCategories.includes(s.category) ? s.category : categorizeSkill(s.name),
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

      const student = await Student.create({
        user: user._id,
        phone: cleanPhone,
        rollNumber: cleanRollNumber,
        department: cleanDepartment,
        semester: semester || 6,
        college: college?._id,
        collegeName: cleanCollegeName,
        skills: formattedSkills,
        overallProgress: 0,
        employabilityScore: 0,
        githubUrl: githubUrl?.trim() || '',
        resumeUrl: resumeUrl || '',
        resumeFileName: resumeFileName || '',
        extractedResumeData: extractedResumeData || {},
      });

      return res.status(201).json({
        success: true,
        message: 'Registration complete. Sign in with email, password, and the SMS OTP sent to your registered phone.',
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
    } catch (createErr) {
      // Rollback user if student profile creation fails
      await User.deleteOne({ _id: user._id });
      throw createErr;
    }
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

    if (!name?.trim() || !email?.trim() || !password || !institutionName?.trim() || !code?.trim()) {
      return res.status(400).json({ success: false, message: 'College name, email, password, and AISHE/College Code are required' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase().trim(), role: 'college' });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'A college account already exists with this email' });
    }

    const user = await User.create({
      name: name || 'Dr. Mehta',
      email: email.toLowerCase().trim(),
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

    await Student.updateMany(
      { college: { $exists: false }, collegeName: { $regex: `^${institutionName.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } },
      { $set: { college: college._id } }
    );

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

    if (!name?.trim() || !email?.trim() || !password || !companyName?.trim()) {
      return res.status(400).json({ success: false, message: 'Company name, email, password, and recruiter name are required' });
    }

    if (!gstNumber || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber.trim().toUpperCase())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 15-character GST Number (e.g. 22AAAAA0000A1Z5)' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase().trim(), role: 'company' });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'A company account already exists with this email' });
    }

    const user = await User.create({
      name: name || 'HR Representative',
      email: email.toLowerCase().trim(),
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

// @desc    Step 1 of Student Login: Validate Email/Password & Dispatch SMS OTP
// @route   POST /api/auth/student-login-init
// @access  Public
exports.studentLoginInit = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim(), role: 'student' }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
    }

    if (!user.phone) {
      return res.status(400).json({
        success: false,
        message: 'No registered mobile number associated with this student account.',
      });
    }

    // Generate, hash, and store 6-digit OTP (5-minute expiry)
    const otp = generateOTP();
    const otpHash = hashOTP(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ userId: user._id });
    await Otp.create({
      userId: user._id,
      email: user.email,
      phone: user.phone,
      otpHash,
      expiresAt,
    });

    try {
      await sendSMSOTP(user.phone, otp);
    } catch (smsError) {
      await Otp.deleteMany({ userId: user._id });
      throw smsError;
    }

    const maskedPhone = `******${user.phone.slice(-4)}`;

    res.status(200).json({
      success: true,
      requireOtp: true,
      message: `OTP sent to your registered mobile number (+91 ${maskedPhone})`,
      maskedPhone,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Step 2 of Student Login: Verify OTP & Issue JWT
// @route   POST /api/auth/student-login-verify
// @access  Public
exports.studentLoginVerify = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email, password, and OTP' });
    }

    const cleanOtp = String(otp).trim();
    if (!/^\d{6}$/.test(cleanOtp)) {
      return res.status(401).json({ success: false, message: 'Please enter a valid 6-digit OTP' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim(), role: 'student' }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid student credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid student credentials' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
    }

    // Fetch and verify OTP
    const otpRecord = await Otp.findOne({ userId: user._id });
    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: 'No active OTP found or OTP has expired. Please request a new OTP.',
      });
    }

    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteMany({ userId: user._id });
      return res.status(401).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.',
      });
    }

    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(429).json({ success: false, message: 'Too many invalid OTP attempts. Please request a new OTP.' });
    }

    const isOtpValid = verifyOTPHash(cleanOtp, otpRecord.otpHash);
    if (!isOtpValid) {
      await Otp.updateOne({ _id: otpRecord._id }, { $inc: { attempts: 1 } });
      return res.status(401).json({
        success: false,
        message: 'Invalid OTP code. Please enter the correct 6-digit code sent to your phone.',
      });
    }

    // OTP verified successfully: Delete OTP to prevent reuse
    await Otp.deleteMany({ userId: user._id });

    // Issue JWT Token ONLY now
    const token = generateToken(user._id, user.role);
    const roleDetails = await Student.findOne({ user: user._id });

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

// @desc    Resend Student SMS OTP
// @route   POST /api/auth/student-resend-otp
// @access  Public
exports.resendStudentOTP = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim(), role: 'student' }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid student credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid student credentials' });
    }

    const otp = generateOTP();
    const otpHash = hashOTP(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ userId: user._id });
    await Otp.create({
      userId: user._id,
      email: user.email,
      phone: user.phone,
      otpHash,
      expiresAt,
    });

    try {
      await sendSMSOTP(user.phone, otp);
    } catch (smsError) {
      await Otp.deleteMany({ userId: user._id });
      throw smsError;
    }

    const maskedPhone = `******${user.phone.slice(-4)}`;
    res.status(200).json({
      success: true,
      message: `New OTP has been sent to +91 ${maskedPhone}`,
      maskedPhone,
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
    const { email, password, role, otp } = req.body;

    if (!email || !password) {
      return res.status(401).json({ success: false, message: 'Please provide email and password' });
    }

    // If student role is logging in:
    if (role === 'student') {
      if (otp) {
        return exports.studentLoginVerify(req, res, next);
      }
      return exports.studentLoginInit(req, res, next);
    }

    // Standard login for College, Company, Admin
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
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
    if (user.role === 'college') {
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
    if (phone) {
      user.phone = phone;
      if (user.role === 'student') {
        await Student.updateOne({ user: user._id }, { phone });
      }
    }
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
