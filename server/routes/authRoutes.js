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
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/parse-resume', upload.single('resume'), parseResume);
router.post('/register-student', registerStudent);
router.post('/register-college', registerCollege);
router.post('/register-company', registerCompany);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
