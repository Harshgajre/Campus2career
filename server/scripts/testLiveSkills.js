require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');
const Student = require('../models/Student');
const Skill = require('../models/Skill');
const generateToken = require('../utils/generateToken');

const testLiveSkillEndpoints = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB Atlas');

  try {
    // 1. Create test user and student
    const testEmail = 'live_skill_test@example.com';
    await Student.deleteMany({});
    await User.deleteMany({ email: testEmail });

    const user = await User.create({
      name: 'Skill Test User',
      email: testEmail,
      password: 'password123',
      phone: '9876501234',
      role: 'student',
    });

    const token = generateToken(user._id, user.role);

    const student = await Student.create({
      user: user._id,
      phone: '9876501234',
      rollNumber: 'SKILL-TEST-001',
      skills: [
        { name: 'React', category: 'Frontend', level: 'Advanced' },
        { name: 'Node.js', category: 'Backend', level: 'Intermediate' },
      ],
    });

    console.log('✅ Initial student created with Frontend & Backend skills');

    // 2. Add "Database" skill via API
    const addDbRes = await axios.post(
      'http://localhost:5000/api/students/skills',
      { name: 'MongoDB', category: 'Database', level: 'Advanced' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Successfully added Database skill via API:', addDbRes.data.message);

    // 3. Add "Tools" skill via API
    const addToolsRes = await axios.post(
      'http://localhost:5000/api/students/skills',
      { name: 'Docker', category: 'Tools', level: 'Intermediate' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Successfully added Tools skill via API:', addToolsRes.data.message);

    // 4. Fetch skills and verify all 4 categories exist
    const getRes = await axios.get(
      'http://localhost:5000/api/students/skills',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Fetched skills count:', getRes.data.skills.length);
    const categoriesInDb = getRes.data.skills.map(s => `${s.name} -> [${s.category}]`);
    console.log('Skills in DB:', categoriesInDb);

    // Check that Database and Tools are present
    const hasDatabase = getRes.data.skills.some(s => s.category === 'Database');
    const hasTools = getRes.data.skills.some(s => s.category === 'Tools');
    const hasFrontend = getRes.data.skills.some(s => s.category === 'Frontend');
    const hasBackend = getRes.data.skills.some(s => s.category === 'Backend');

    if (!hasDatabase || !hasTools || !hasFrontend || !hasBackend) {
      throw new Error(`Missing expected category! Found DB: ${hasDatabase}, Tools: ${hasTools}, Frontend: ${hasFrontend}, Backend: ${hasBackend}`);
    }

    // 5. Update skill category
    const skillToUpdate = getRes.data.skills[0];
    const updateRes = await axios.put(
      `http://localhost:5000/api/students/skills/${skillToUpdate._id}`,
      { category: 'Tools', level: 'Expert' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Successfully updated skill category to Tools:', updateRes.data.skill.category);

    // 6. Test Master Skill model with Database and Tools
    const masterDb = await Skill.create({ name: 'PostgreSQL Master Test', category: 'Database' });
    const masterTool = await Skill.create({ name: 'Kubernetes Master Test', category: 'Tools' });
    console.log(`✅ Master Skills created: ${masterDb.name} (${masterDb.category}), ${masterTool.name} (${masterTool.category})`);

    // Clean up
    await Student.deleteOne({ _id: student._id });
    await User.deleteOne({ _id: user._id });
    await Skill.deleteMany({ _id: { $in: [masterDb._id, masterTool._id] } });
    console.log('🧹 Cleaned up test data');

    console.log('🎉 ALL LIVE API & MONGOOSE TESTS PASSED WITH 0 ERRORS!');
  } catch (err) {
    console.error('❌ Test Failed:', err.response?.data || err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

testLiveSkillEndpoints();
