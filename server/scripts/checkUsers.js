require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');

const checkDb = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);
  console.log('Connected to DB');

  const users = await User.find({}, { name: 1, email: 1, role: 1, phone: 1 });
  console.log('All Users in DB:', JSON.stringify(users, null, 2));

  const students = await Student.find({});
  console.log('All Student records in DB:', JSON.stringify(students, null, 2));

  await mongoose.disconnect();
};

checkDb();
