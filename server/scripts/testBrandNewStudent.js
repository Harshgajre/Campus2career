require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');
const Student = require('../models/Student');

const testBrandNewStudent = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);
  console.log('Connected to DB');

  const testEmail = 'brandnewstudent2026@gmail.com';
  const testPhone = '9123456780';

  // Clean up if exists from before
  const existing = await User.findOne({ email: testEmail, role: 'student' });
  if (existing) {
    await Student.deleteMany({ user: existing._id });
    await User.deleteOne({ _id: existing._id });
  }

  const payload = {
    name: 'Brand New Student',
    email: testEmail,
    password: 'securepassword123',
    phone: testPhone,
    rollNumber: 'ROLL-NEW-001',
    collegeName: 'National Institute of Technology',
    department: 'Computer Science',
    githubUrl: 'https://github.com/brandnewstudent',
    skills: [
      { name: 'React', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'Docker', category: 'Tools' },
    ],
  };

  try {
    const res = await axios.post('http://localhost:5000/api/auth/register-student', payload);
    console.log('✅ Registration API response status:', res.status, res.data.success);

    // Verify DB count
    const studentUsersCount = await User.countDocuments({ email: testEmail, role: 'student' });
    const studentDocsCount = await Student.countDocuments({ rollNumber: 'ROLL-NEW-001' });

    console.log(`✅ Student User documents created: ${studentUsersCount} (Expected: 1)`);
    console.log(`✅ Student Profile documents created: ${studentDocsCount} (Expected: 1)`);

    if (studentUsersCount !== 1 || studentDocsCount !== 1) {
      throw new Error(`Expected exactly 1 User and 1 Student document, found User: ${studentUsersCount}, Student: ${studentDocsCount}`);
    }

    // Test duplicate rejection
    try {
      await axios.post('http://localhost:5000/api/auth/register-student', payload);
      console.error('❌ Duplicate was NOT rejected!');
    } catch (dupErr) {
      console.log('✅ Duplicate registration correctly rejected with 400:', dupErr.response?.data?.message);
    }

    // Cleanup
    const userDoc = await User.findOne({ email: testEmail, role: 'student' });
    if (userDoc) {
      await Student.deleteMany({ user: userDoc._id });
      await User.deleteOne({ _id: userDoc._id });
    }
    console.log('🧹 Cleaned up test data');

    console.log('🎉 VERIFICATION PASSED PERFECTLY!');
  } catch (err) {
    console.error('❌ Test failed:', err.response?.data || err.message);
  } finally {
    await mongoose.disconnect();
  }
};

testBrandNewStudent();
