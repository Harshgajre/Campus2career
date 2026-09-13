require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const Skill = require('../models/Skill');
const { categorizeSkill } = require('../utils/skillCategorizer');

const testSkillEnum = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB Atlas');

  try {
    // Isolated test identity; clean up a previous interrupted run only.
    const priorUser = await User.findOne({ email: 'enumtest@example.com', role: 'student' });
    if (priorUser) {
      await Student.deleteMany({ user: priorUser._id });
      await User.deleteOne({ _id: priorUser._id });
    }
    // 1. Test skill categorizer outputs
    const testCases = [
      { skill: 'React.js', expected: 'Frontend' },
      { skill: 'Tailwind CSS', expected: 'Frontend' },
      { skill: 'Node.js', expected: 'Backend' },
      { skill: 'Python', expected: 'Backend' },
      { skill: 'MongoDB', expected: 'Database' },
      { skill: 'PostgreSQL', expected: 'Database' },
      { skill: 'Docker', expected: 'Tools' },
      { skill: 'Git', expected: 'Tools' },
      { skill: 'Kubernetes', expected: 'Tools' },
    ];

    console.log('Testing categorizeSkill function:');
    testCases.forEach(({ skill, expected }) => {
      const res = categorizeSkill(skill);
      if (res !== expected) {
        throw new Error(`categorizeSkill("${skill}") returned "${res}", expected "${expected}"`);
      }
      console.log(`  ✓ ${skill} -> ${res}`);
    });

    // 2. Test Student model with all 4 categories: Frontend, Backend, Database, Tools
    const testUser = await User.create({
      name: 'Enum Test User',
      email: 'enumtest@example.com',
      password: 'password123',
      phone: '9998887776',
      role: 'student',
    });

    const testSkills = [
      { name: 'React.js', category: 'Frontend', level: 'Advanced' },
      { name: 'Node.js', category: 'Backend', level: 'Advanced' },
      { name: 'MongoDB', category: 'Database', level: 'Intermediate' },
      { name: 'PostgreSQL', category: 'Database', level: 'Advanced' },
      { name: 'Docker', category: 'Tools', level: 'Beginner' },
      { name: 'Git & GitHub', category: 'Tools', level: 'Expert' },
    ];

    const student = await Student.create({
      user: testUser._id,
      phone: '9998887776',
      rollNumber: 'ENUM-001',
      collegeName: 'Enum Test College',
      skills: testSkills,
    });

    console.log(`✅ Student created successfully with ${student.skills.length} skills across all 4 categories!`);

    // 3. Test dynamic skill insertion for Database & Tools
    student.skills.push({
      name: 'Redis',
      category: 'Database',
      level: 'Intermediate',
    });
    student.skills.push({
      name: 'Kubernetes',
      category: 'Tools',
      level: 'Intermediate',
    });
    await student.save();
    console.log(`✅ Dynamically pushed and saved Database and Tools skills! Total: ${student.skills.length}`);

    // 4. Test Master Skill model with Database and Tools
    await Skill.deleteMany({ name: { $in: ['Test Mongo', 'Test Docker'] } });
    const masterDbSkill = await Skill.create({
      name: 'Test Mongo',
      category: 'Database',
      demandLevel: 'High',
    });
    console.log(`✅ Master Skill created with category Database: ${masterDbSkill.name} (${masterDbSkill.category})`);

    const masterToolSkill = await Skill.create({
      name: 'Test Docker',
      category: 'Tools',
      demandLevel: 'High',
    });
    console.log(`✅ Master Skill created with category Tools: ${masterToolSkill.name} (${masterToolSkill.category})`);

    // Cleanup
    await Student.deleteOne({ _id: student._id });
    await User.deleteOne({ _id: testUser._id });
    await Skill.deleteMany({ name: { $in: ['Test Mongo', 'Test Docker'] } });
    console.log('🧹 Cleaned up test data');

    console.log('🎉 ALL SKILL ENUM TESTS PASSED WITH 0 ERRORS!');
  } catch (error) {
    console.error('❌ Skill Enum Test Failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

testSkillEnum();
