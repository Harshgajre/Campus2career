const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Student = require('./models/Student');
const bcrypt = require('bcryptjs');

async function runTests() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ DB Connected");

    console.log("Testing User.findOne()...");
    const user = await User.findOne();
    console.log("✅ findOne() successful. Found user:", user ? "Yes" : "No");

    console.log("Testing Registration...");
    const testEmail = `test_${Date.now()}@test.com`;
    const newUser = await User.create({
      name: 'Test User',
      email: testEmail,
      password: 'password123',
      role: 'student'
    });
    console.log("✅ User created:", newUser.email);

    console.log("Testing Login...");
    const loginUser = await User.findOne({ email: testEmail }).select('+password');
    const isMatch = await loginUser.matchPassword('password123');
    console.log("✅ Login matched:", isMatch);
    
    // Cleanup
    await User.deleteOne({ email: testEmail });
    console.log("✅ Cleanup done");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
    process.exit(1);
  }
}

runTests();
