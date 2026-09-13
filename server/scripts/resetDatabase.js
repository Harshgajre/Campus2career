require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const User = require('../models/User');
const Student = require('../models/Student');
const College = require('../models/College');
const Company = require('../models/Company');
const Application = require('../models/Application');
const Challenge = require('../models/Challenge');
const ChallengeSubmission = require('../models/ChallengeSubmission');
const Internship = require('../models/Internship');
const Interview = require('../models/Interview');
const Notification = require('../models/Notification');
const Opportunity = require('../models/Opportunity');
const Placement = require('../models/Placement');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const TrainingProgram = require('../models/TrainingProgram');
const Otp = require('../models/Otp');

const resetDatabase = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected to MongoDB Atlas');

    // Delete all documents across all collections
    const collections = [
      { name: 'User', model: User },
      { name: 'Student', model: Student },
      { name: 'College', model: College },
      { name: 'Company', model: Company },
      { name: 'Application', model: Application },
      { name: 'Challenge', model: Challenge },
      { name: 'ChallengeSubmission', model: ChallengeSubmission },
      { name: 'Internship', model: Internship },
      { name: 'Interview', model: Interview },
      { name: 'Notification', model: Notification },
      { name: 'Opportunity', model: Opportunity },
      { name: 'Placement', model: Placement },
      { name: 'Project', model: Project },
      { name: 'Skill', model: Skill },
      { name: 'TrainingProgram', model: TrainingProgram },
      { name: 'Otp', model: Otp },
    ];

    console.log('\n--- Resetting Database Collections ---');
    for (const { name, model } of collections) {
      const res = await model.deleteMany({});
      console.log(`🗑️  Deleted ${res.deletedCount} document(s) from ${name}`);
    }

    // Verify all counts are 0
    console.log('\n--- Verifying Document Counts ---');
    let allEmpty = true;
    for (const { name, model } of collections) {
      const count = await model.countDocuments();
      console.log(`📊 ${name}: ${count} document(s)`);
      if (count !== 0) allEmpty = false;
    }

    const studentUsers = await User.countDocuments({ role: 'student' });
    const collegeUsers = await User.countDocuments({ role: 'college' });
    const companyUsers = await User.countDocuments({ role: 'company' });

    console.log('\n--- Role Breakdown ---');
    console.log(`👤 Student Users: ${studentUsers}`);
    console.log(`🏫 College Users: ${collegeUsers}`);
    console.log(`🏢 Company Users: ${companyUsers}`);

    if (allEmpty && studentUsers === 0 && collegeUsers === 0 && companyUsers === 0) {
      console.log('\n🎉 DATABASE FULLY RESET AND CLEAN! Ready for fresh registrations.');
    } else {
      console.error('\n⚠️ Warning: Some collections still have data.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Database reset failed:', err);
    process.exit(1);
  }
};

resetDatabase();
