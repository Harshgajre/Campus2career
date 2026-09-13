require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const Application = require('../models/Application');
const ChallengeSubmission = require('../models/ChallengeSubmission');
const Interview = require('../models/Interview');

const resetStudentData = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB');

    // 1. Find all student users
    const studentUsers = await User.find({ role: 'student' });
    const studentUserIds = studentUsers.map(u => u._id);
    console.log(`🔍 Found ${studentUsers.length} student user(s)`);

    // 2. Find all student documents
    const studentDocs = await Student.find({});
    const studentDocIds = studentDocs.map(s => s._id);
    console.log(`🔍 Found ${studentDocs.length} student profile document(s)`);

    // 3. Delete Student-specific dependent data
    const appResult = await Application.deleteMany({
      $or: [
        { student: { $in: studentDocIds } },
        { user: { $in: studentUserIds } },
      ],
    });
    console.log(`🗑️  Deleted ${appResult.deletedCount} student application(s)`);

    const subResult = await ChallengeSubmission.deleteMany({
      $or: [
        { student: { $in: studentDocIds } },
        { user: { $in: studentUserIds } },
      ],
    });
    console.log(`🗑️  Deleted ${subResult.deletedCount} challenge submission(s)`);

    const interviewResult = await Interview.deleteMany({
      $or: [
        { student: { $in: studentDocIds } },
        { user: { $in: studentUserIds } },
      ],
    });
    console.log(`🗑️  Deleted ${interviewResult.deletedCount} student interview(s)`);

    // 4. Delete all Student documents
    const studentResult = await Student.deleteMany({});
    console.log(`🗑️  Deleted ${studentResult.deletedCount} student document(s)`);

    // 5. Delete all User records with role === 'student'
    const userResult = await User.deleteMany({ role: 'student' });
    console.log(`🗑️  Deleted ${userResult.deletedCount} student user account(s)`);

    // 6. Verify College and Company data are intact
    const collegeUsersCount = await User.countDocuments({ role: 'college' });
    const companyUsersCount = await User.countDocuments({ role: 'company' });
    const adminUsersCount = await User.countDocuments({ role: 'admin' });

    console.log('----------------------------------------------------');
    console.log('✅ Student data successfully reset!');
    console.log(`🔒 Preserved College accounts: ${collegeUsersCount}`);
    console.log(`🔒 Preserved Company accounts: ${companyUsersCount}`);
    console.log(`🔒 Preserved Admin accounts: ${adminUsersCount}`);
    console.log('----------------------------------------------------');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
};

resetStudentData();
