const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  registerStudent,
  registerCollege,
  registerCompany,
  login,
  getMe,
  updateProfile,
  parseResume,
  initiateDigiLocker,
  digiLockerCallback,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/parse-resume', upload.single('resume'), parseResume);
router.post('/register-student', registerStudent);
router.post('/register-college', registerCollege);
router.post('/register-company', registerCompany);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// DigiLocker OAuth 2.0 (Student only)
router.get('/digilocker', initiateDigiLocker);
router.get('/digilocker/callback', digiLockerCallback);

module.exports = router;
