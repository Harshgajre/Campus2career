const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  registerStudent,
  registerCollege,
  registerCompany,
  login,
  studentLoginInit,
  studentLoginVerify,
  resendStudentOTP,
  getMe,
  updateProfile,
  parseResume,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/parse-resume', upload.single('resume'), parseResume);
router.post('/register-student', registerStudent);
router.post('/register-college', registerCollege);
router.post('/register-company', registerCompany);
router.post('/login', login);
router.post('/student-login-init', studentLoginInit);
router.post('/student-login-verify', studentLoginVerify);
router.post('/student-resend-otp', resendStudentOTP);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
