const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config({ path: __dirname + '/../.env' });

// Models
const User = require('../models/User');
const Student = require('../models/Student');
const College = require('../models/College');
const Company = require('../models/Company');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const Challenge = require('../models/Challenge');
const TrainingProgram = require('../models/TrainingProgram');
const Interview = require('../models/Interview');
const Internship = require('../models/Internship');
const Placement = require('../models/Placement');
const Notification = require('../models/Notification');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campus2career';
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log('✅ Connected to DB. Purging existing collections...');


    // Clear old data
    await User.deleteMany();
    await Student.deleteMany();
    await College.deleteMany();
    await Company.deleteMany();
    await Skill.deleteMany();
    await Project.deleteMany();
    await Opportunity.deleteMany();
    await Application.deleteMany();
    await Challenge.deleteMany();
    await TrainingProgram.deleteMany();
    await Interview.deleteMany();
    await Internship.deleteMany();
    await Placement.deleteMany();
    await Notification.deleteMany();

    console.log('Creating Seed Users...');
    const salt = await bcrypt.genSalt(10);
    const defaultHashedPassword = await bcrypt.hash('password123', salt);

    // 1. Student User: Harsh Gajre
    const studentUser = await User.create({
      name: 'Harsh Gajre',
      email: 'harsh@campus2career.com',
      password: defaultHashedPassword,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      phone: '+91 98765 43210',
      status: 'active',
      themePreference: 'dark',
    });

    // 2. College User: Dr. Mehta
    const collegeUser = await User.create({
      name: 'Dr. Mehta',
      email: 'mehta@campus2career.com',
      password: defaultHashedPassword,
      role: 'college',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      phone: '+91 98234 56789',
      status: 'active',
      themePreference: 'dark',
    });

    // 3. Company User: Riya Patel
    const companyUser = await User.create({
      name: 'Riya Patel',
      email: 'riya@techcorp.com',
      password: defaultHashedPassword,
      role: 'company',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      phone: '+91 98111 22334',
      status: 'active',
      themePreference: 'dark',
    });

    // 4. Admin User: Super Admin
    const adminUser = await User.create({
      name: 'Super Admin',
      email: 'admin@campus2career.com',
      password: defaultHashedPassword,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      phone: '+91 99000 11223',
      status: 'active',
      themePreference: 'dark',
    });

    console.log('Creating Profile entities...');

    // Create College profile
    const college = await College.create({
      user: collegeUser._id,
      institutionName: 'Apex Institute of Technology',
      code: 'AIT-4110',
      university: 'State Technological University',
      state: 'Maharashtra',
      city: 'Pune',
      accreditation: 'NAAC A++',
      contactPerson: 'Dr. Mehta',
      designation: 'Dean of Academics & Placements',
      totalStudents: 1245,
      activePrograms: 32,
      internshipsCount: 85,
      placementsCount: 62,
    });

    // Create Company profile
    const company = await Company.create({
      user: companyUser._id,
      companyName: 'TechCorp Solutions',
      industryType: 'Information Technology & Software',
      location: 'Bangalore, India',
      website: 'https://techcorp.example.com',
      hrName: 'Riya Patel',
      hrDesignation: 'Lead Talent Acquisition Partner',
      openOpportunitiesCount: 18,
      totalCandidatesCount: 320,
      shortlistedCount: 64,
      interviewsCount: 26,
    });

    // Student Skills
    const studentSkills = [
      { name: 'React.js', category: 'Frontend', level: 'Advanced', verified: true, score: 94 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', level: 'Expert', verified: true, score: 96 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', verified: true, score: 92 },
      { name: 'Node.js', category: 'Backend', level: 'Advanced', verified: true, score: 88 },
      { name: 'Express.js', category: 'Backend', level: 'Advanced', verified: true, score: 86 },
      { name: 'MongoDB', category: 'Backend', level: 'Intermediate', verified: true, score: 82 },
      { name: 'Data Structures & Algorithms', category: 'Core CS', level: 'Advanced', verified: true, score: 90 },
      { name: 'Git & GitHub', category: 'DevOps & Cloud', level: 'Expert', verified: true, score: 95 },
      { name: 'REST APIs & GraphQL', category: 'Backend', level: 'Advanced', verified: true, score: 89 },
      { name: 'UI/UX Prototyping (Figma)', category: 'UI/UX', level: 'Intermediate', verified: true, score: 80 },
      { name: 'TypeScript', category: 'Frontend', level: 'Intermediate', verified: true, score: 78 },
      { name: 'Docker Containers', category: 'DevOps & Cloud', level: 'Beginner', verified: false, score: 65 },
    ];

    // Create Student profile
    const student = await Student.create({
      user: studentUser._id,
      college: college._id,
      collegeName: 'Apex Institute of Technology',
      rollNumber: 'STU-2024-001',
      department: 'Computer Science',
      semester: 6,
      cgpa: 8.9,
      bio: 'Full-stack developer passionate about high-performance React architectures, UI engineering, and scalable backend services.',
      skills: studentSkills,
      overallProgress: 75,
      employabilityScore: 88,
      githubUrl: 'https://github.com/harshgajre',
      linkedinUrl: 'https://linkedin.com/in/harshgajre',
      portfolioUrl: 'https://harshgajre.dev',
      passportId: 'C2C-PASSPORT-2026-HG01',
      challengesCompletedCount: 8,
      projectsCompletedCount: 5,
      applicationsCount: 3,
    });

    console.log('Creating Student Projects...');
    await Project.create([
      {
        student: student._id,
        title: 'Campus2Career Platform',
        description: 'Complete role-based platform bridging students, colleges, and enterprises with real-time analytics.',
        technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Recharts'],
        githubLink: 'https://github.com/harshgajre/campus2career',
        liveLink: 'https://campus2career.io',
        status: 'completed',
        featured: true,
      },
      {
        student: student._id,
        title: 'AI Resume & Skill Gap Analyzer',
        description: 'Machine learning vector search engine for automatic skill extraction and gap matching.',
        technologies: ['Python', 'FastAPI', 'React', 'OpenAI API'],
        githubLink: 'https://github.com/harshgajre/ai-matcher',
        liveLink: 'https://ai-matcher.demo.io',
        status: 'completed',
        featured: true,
      },
      {
        student: student._id,
        title: 'Real-time Collaborative Code Editor',
        description: 'WebRTC and Monaco code editor with live syntax highlighting and execution sandbox.',
        technologies: ['React', 'Socket.io', 'Monaco Editor', 'Docker'],
        githubLink: 'https://github.com/harshgajre/collab-code',
        liveLink: 'https://collab-code.io',
        status: 'completed',
      },
    ]);

    console.log('Creating Opportunities & Challenges...');
    const opp1 = await Opportunity.create({
      company: company._id,
      companyName: 'TechCorp Solutions',
      title: 'Frontend Developer Intern',
      type: 'Internship',
      location: 'Bangalore (Hybrid)',
      locationType: 'Hybrid',
      stipend: '₹35,000 / month',
      duration: '6 Months',
      deadline: '5d left',
      requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
      preferredSkills: ['Next.js', 'Redux Toolkit'],
      description: 'Build high-performance responsive web applications with React 18, Tailwind, and Recharts telemetry.',
      openingsCount: 4,
      applicationsCount: 48,
      status: 'open',
    });

    const opp2 = await Opportunity.create({
      company: company._id,
      companyName: 'TechCorp Solutions',
      title: 'Full Stack Engineer (MERN)',
      type: 'Job',
      location: 'Bangalore / Remote',
      locationType: 'Remote',
      stipend: '₹14 - 18 LPA',
      duration: 'Full Time',
      deadline: '12d left',
      requiredSkills: ['Node.js', 'Express', 'React', 'MongoDB', 'AWS'],
      preferredSkills: ['Docker', 'Microservices', 'GraphQL'],
      description: 'Design and deploy scalable backend microservices, REST endpoints, and dynamic React frontends.',
      openingsCount: 3,
      applicationsCount: 76,
      status: 'open',
    });

    const opp3 = await Opportunity.create({
      company: company._id,
      companyName: 'CodeSoft Global',
      title: 'Web Developer Intern',
      type: 'Internship',
      location: 'Hyderabad / Hybrid',
      locationType: 'Hybrid',
      stipend: '₹28,000 / month',
      duration: '6 Months',
      deadline: '8d left',
      requiredSkills: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
      description: 'Develop REST endpoints, database schemas, and integrate responsive UI views.',
      openingsCount: 5,
      applicationsCount: 54,
      status: 'open',
    });

    // Create Challenges
    await Challenge.create([
      {
        title: 'React & Tailwind Enterprise Dashboard UI',
        companyName: 'TechCorp Solutions',
        description: 'Design and build a responsive analytics dashboard with dark mode and Recharts telemetry.',
        difficulty: 'Intermediate',
        category: 'Frontend Development',
        requiredSkills: ['React', 'Tailwind CSS', 'Recharts', 'State Management'],
        deadline: '1w left',
        prizePoints: '₹25,000 + Direct Interview Call',
        participantsCount: 142,
        status: 'active',
      },
      {
        title: 'UI/UX Design Challenge: FinTech App',
        companyName: 'DesignStudio',
        description: 'Create an intuitive, accessible mobile app UI and design system in Figma.',
        difficulty: 'Intermediate',
        category: 'UI/UX Design',
        requiredSkills: ['Figma', 'Design Systems', 'Prototyping'],
        deadline: '1w left',
        prizePoints: '₹25,000 Prize',
        participantsCount: 95,
        status: 'active',
      },
      {
        title: 'High-Concurrency Rate Limiter in Node.js',
        companyName: 'CodeSoft Global',
        description: 'Build a distributed token-bucket rate limiter backed by Redis with sub-millisecond response times.',
        difficulty: 'Advanced',
        category: 'Backend Systems',
        requiredSkills: ['Node.js', 'Redis', 'Docker'],
        deadline: '4d left',
        prizePoints: '₹35,000 + Internship Offer',
        participantsCount: 88,
        status: 'active',
      },
    ]);

    console.log('Creating Applications & Interviews...');
    await Application.create([
      {
        opportunity: opp1._id,
        student: student._id,
        company: company._id,
        studentName: 'Harsh Gajre',
        studentEmail: 'harsh@campus2career.com',
        opportunityTitle: 'Frontend Developer Intern',
        companyName: 'TechCorp Solutions',
        status: 'Interview Scheduled',
        matchScore: 94,
        coverNote: 'Extensive hands-on experience building enterprise React dashboards.',
        resumeUrl: 'https://campus2career.io/resumes/harsh-gajre.pdf',
      },
      {
        opportunity: opp2._id,
        student: student._id,
        company: company._id,
        studentName: 'Harsh Gajre',
        studentEmail: 'harsh@campus2career.com',
        opportunityTitle: 'Full Stack Engineer (MERN)',
        companyName: 'TechCorp Solutions',
        status: 'Under Review',
        matchScore: 91,
      },
    ]);

    await Interview.create([
      {
        company: company._id,
        student: student._id,
        studentName: 'Harsh Gajre',
        studentEmail: 'harsh@campus2career.com',
        roleTitle: 'Frontend Developer Intern',
        date: '2026-09-10',
        time: '11:00 AM IST',
        type: 'Technical Round 1',
        meetingLink: 'https://meet.google.com/xyz-tech-round',
        interviewerName: 'Alex Morgan (Principal UI Engineer)',
        status: 'Scheduled',
        notes: 'React state architecture, virtual DOM, custom hooks, and live coding challenge.',
      },
    ]);

    console.log('Creating Training Programs & Placements...');
    await TrainingProgram.create([
      {
        college: college._id,
        collegeName: 'Apex Institute of Technology',
        title: 'Full Stack Cloud Native Engineering',
        description: 'Comprehensive 8-week industrial program focusing on Docker, Microservices, and MERN stack.',
        skillsCovered: ['React', 'Node.js', 'Docker', 'Kubernetes', 'CI/CD'],
        department: 'Computer Science & IT',
        trainerName: 'Dr. R. K. Sharma (Industry Expert)',
        startDate: '2026-09-15',
        endDate: '2026-11-30',
        durationWeeks: 8,
        enrolledCount: 140,
        maxCapacity: 150,
        progress: 45,
        status: 'active',
      },
    ]);

    await Notification.create([
      {
        user: studentUser._id,
        title: 'Interview Scheduled',
        message: 'TechCorp scheduled Technical Round 1 for Sep 10, 11:00 AM.',
        type: 'interview',
        isRead: false,
        timeAgo: '2h ago',
        link: '/student/applications',
      },
    ]);

    console.log('====================================================');
    console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
    console.log('====================================================');
    console.log('DEMO ACCOUNTS CREATED:');
    console.log('Student:   harsh@campus2career.com / password123');
    console.log('College:   mehta@campus2career.com / password123');
    console.log('Company:   riya@techcorp.com / password123');
    console.log('Admin:     admin@campus2career.com / password123');
    console.log('====================================================');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
