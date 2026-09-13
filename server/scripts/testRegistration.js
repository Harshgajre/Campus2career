require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');
const Student = require('../models/Student');
const Otp = require('../models/Otp');
const { hashOTP } = require('../utils/otpService');

const testStudentRegistration = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);
  console.log('Connected to DB');

  const testEmail = 'teststudent2026@gmail.com';
  const testPhone = '9876543210';

  // Clean up any test records first
  const existingUser = await User.findOne({ email: testEmail, role: 'student' });
  if (existingUser) {
    await Student.deleteMany({ user: existingUser._id });
    await User.deleteOne({ _id: existingUser._id });
  }

  // Test registration payload
  const registrationPayload = {
    name: 'Test Student',
    email: testEmail,
    password: 'password123',
    phone: testPhone,
    rollNumber: 'ROLL-2026-99',
    collegeName: 'Test Engineering College',
    department: 'Computer Science',
    githubUrl: 'https://github.com/teststudent',
    skills: [
      { name: 'React.js', category: 'Frontend' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'Docker', category: 'Tools' },
    ],
  };

  try {
    const res = await axios.post('http://localhost:5000/api/auth/register-student', registrationPayload);
    console.log('✅ Student Registration Response:', res.data.success, res.data.user.email);

    // Verify in DB
    const createdUser = await User.findOne({ email: testEmail, role: 'student' });
    const createdStudent = await Student.findOne({ user: createdUser._id });
    console.log('✅ Found User in DB:', createdUser.email, createdUser.role, createdUser.phone);
    console.log('✅ Found Student Profile in DB:', createdStudent.rollNumber, createdStudent.phone, createdStudent.skills.map(s => `${s.name} (${s.category})`));

    // Test Student Login OTP init
    const initRes = await axios.post('http://localhost:5000/api/auth/student-login-init', {
      email: testEmail,
      password: 'password123',
    });
    console.log('✅ Student Login Init (OTP Sent):', initRes.data);

    // Check OTP in DB
    const otpRecord = await Otp.findOne({ userId: createdUser._id });
    console.log('✅ OTP record created in DB with expiresAt:', otpRecord.expiresAt);

    // Now test studentLoginVerify with a test OTP
    // Let's create an OTP with known value for verify test
    const knownOtp = '654321';
    await Otp.deleteMany({ userId: createdUser._id });
    await Otp.create({
      userId: createdUser._id,
      email: testEmail,
      phone: testPhone,
      otpHash: hashOTP(knownOtp),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const verifyRes = await axios.post('http://localhost:5000/api/auth/student-login-verify', {
      email: testEmail,
      password: 'password123',
      otp: knownOtp,
    });
    console.log('✅ Student Login Verify (JWT issued):', verifyRes.data.success, !!verifyRes.data.token, verifyRes.data.user.name);

    // Clean up test student
    await Student.deleteMany({ user: createdUser._id });
    await User.deleteOne({ _id: createdUser._id });
    await Otp.deleteMany({ userId: createdUser._id });
    console.log('🧹 Cleaned up test data');

    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err.response?.data || err.message);
  } finally {
    await mongoose.disconnect();
  }
};

testStudentRegistration();
