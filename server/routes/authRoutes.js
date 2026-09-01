const express = require('express');
const router = express.Router();
const {
  registerStudent,
  registerCollege,
  registerCompany,
  login,
  getMe,
  updateProfile,
  demoLogin,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register-student', registerStudent);
router.post('/register-college', registerCollege);
router.post('/register-company', registerCompany);
router.post('/login', login);
router.post('/demo-login', demoLogin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
