require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');

const fixIndexesAndCleanOrphans = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);
  console.log('Connected to DB');

  const usersCollection = mongoose.connection.db.collection('users');

  // 1. Check and drop global email_1 index if it exists
  const indexes = await usersCollection.indexes();
  const hasEmailIndex = indexes.some(idx => idx.name === 'email_1');
  if (hasEmailIndex) {
    try {
      await usersCollection.dropIndex('email_1');
      console.log('✅ Dropped global email_1 unique index');
    } catch (err) {
      console.log('Note on dropping email_1 index:', err.message);
    }
  }

  // 2. Create compound unique index on { email: 1, role: 1 }
  try {
    await usersCollection.createIndex({ email: 1, role: 1 }, { unique: true });
    console.log('✅ Created compound unique index on { email: 1, role: 1 }');
  } catch (err) {
    console.log('Note on creating compound index:', err.message);
  }

  // 3. Find and remove any orphaned student users (users with role === 'student' but no Student document)
  const studentUsers = await User.find({ role: 'student' });
  for (const stuUser of studentUsers) {
    const studentDoc = await Student.findOne({ user: stuUser._id });
    if (!studentDoc) {
      await User.deleteOne({ _id: stuUser._id });
      console.log(`🗑️ Removed orphaned student user: ${stuUser.email} (${stuUser._id})`);
    }
  }

  console.log('✅ Fix complete!');
  await mongoose.disconnect();
};

fixIndexesAndCleanOrphans();
