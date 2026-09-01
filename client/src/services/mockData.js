// Mock Data for Campus2Career Frontend Development
// Used when the backend is unavailable

export const mockData = {
  // ============ STUDENT DATA ============
  student: {
    user: {
      id: 'stu-001',
      name: 'Harsh Gajre',
      email: 'harsh@campus2career.com',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    dashboard: {
      success: true,
      data: {
        welcomeMessage: 'Welcome back, Harsh! 👋',
        subtitle: 'Track your skills, grow and achieve your goals.',
        stats: {
          skills: { count: 12, label: 'Competencies' },
          projects: { count: 5, label: 'Completed' },
          challenges: { count: 8, label: 'Participated' },
          applications: { count: 3, label: 'Active' },
        },
        skillsProgress: {
          overallProgress: 75,
          employabilityScore: 88,
        },
        recentActivity: [
          { id: '1', title: 'Completed React Challenge', time: '2h ago', type: 'challenge' },
          { id: '2', title: 'Updated Project: Portfolio', time: '1d ago', type: 'project' },
          { id: '3', title: 'Applied for Frontend Intern', time: '2d ago', type: 'application' },
        ],
        upcomingOpportunities: [
          { id: '1', title: 'Frontend Developer Intern', company: 'TechCorp', deadline: '5d left', type: 'Internship' },
          { id: '2', title: 'UI/UX Design Challenge', company: 'DesignStudio', deadline: '1w left', type: 'Challenge' },
          { id: '3', title: 'Web Developer Intern', company: 'CodeSoft', deadline: '8d left', type: 'Internship' },
        ],
      },
    },
    skills: {
      success: true,
      data: [
        { id: '1', name: 'JavaScript', category: 'Frontend', level: 'Advanced', verified: true, score: 90 },
        { id: '2', name: 'React', category: 'Frontend', level: 'Advanced', verified: true, score: 88 },
        { id: '3', name: 'Node.js', category: 'Backend', level: 'Intermediate', verified: true, score: 82 },
        { id: '4', name: 'MongoDB', category: 'Database', level: 'Intermediate', verified: true, score: 80 },
        { id: '5', name: 'TypeScript', category: 'Frontend', level: 'Intermediate', verified: false, score: 75 },
      ],
    },
    projects: {
      success: true,
      data: [
        { id: '1', title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution', tech: ['React', 'Node.js', 'MongoDB'], link: 'https://github.com', status: 'Completed' },
        { id: '2', title: 'Task Manager App', description: 'Collaborative task management', tech: ['React', 'Firebase'], link: 'https://github.com', status: 'Completed' },
        { id: '3', title: 'AI Chatbot', description: 'AI-powered customer support', tech: ['Python', 'NLP'], link: 'https://github.com', status: 'In Progress' },
      ],
    },
    applications: {
      success: true,
      data: [
        { id: '1', position: 'Frontend Developer', company: 'TechCorp', status: 'Interview', appliedDate: '2024-08-15', salary: '8-10 LPA' },
        { id: '2', position: 'Full Stack Intern', company: 'CodeSoft', status: 'Under Review', appliedDate: '2024-08-10', salary: '3-5 LPA' },
        { id: '3', position: 'React Developer', company: 'StartupXYZ', status: 'Applied', appliedDate: '2024-08-05', salary: '6-8 LPA' },
      ],
    },
    passport: {
      success: true,
      data: {
        name: 'Harsh Gajre',
        email: 'harsh@campus2career.com',
        skills: [
          { name: 'JavaScript', level: 90 },
          { name: 'React', level: 88 },
          { name: 'Node.js', level: 82 },
        ],
        achievements: ['Certificate in Full Stack Development', 'Winner - Hackathon 2024'],
      },
    },
    roadmap: {
      success: true,
      data: {
        milestones: [
          { id: '1', title: 'Master React Hooks', status: 'In Progress', progress: 70, dueDate: '2024-09-15' },
          { id: '2', title: 'Complete System Design Course', status: 'Not Started', progress: 0, dueDate: '2024-10-31' },
          { id: '3', title: 'Build 2 Production Projects', status: 'In Progress', progress: 50, dueDate: '2024-11-30' },
        ],
      },
    },
    challenges: {
      success: true,
      data: [
        { id: '1', title: 'React Calculator', difficulty: 'Easy', status: 'Completed', points: 100 },
        { id: '2', title: 'Todo App with Redux', difficulty: 'Medium', status: 'In Progress', points: 200 },
        { id: '3', title: 'Real-time Chat App', difficulty: 'Hard', status: 'Not Started', points: 500 },
      ],
    },
    opportunities: {
      success: true,
      data: [
        { id: '1', title: 'Frontend Developer', company: 'TechCorp', type: 'Full-time', location: 'Remote', salary: '8-10 LPA' },
        { id: '2', title: 'React Intern', company: 'StartupXYZ', type: 'Internship', location: 'Bangalore', salary: '3-5 LPA' },
        { id: '3', title: 'Full Stack Developer', company: 'CodeSoft', type: 'Contract', location: 'Mumbai', salary: '6-8 LPA' },
      ],
    },
  },

  // ============ COLLEGE DATA ============
  college: {
    user: {
      id: 'col-001',
      name: 'Dr. Mehta',
      email: 'college@campus2career.com',
      role: 'college',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    dashboard: {
      success: true,
      data: {
        welcomeMessage: 'Welcome, Dr. Mehta! 🎓',
        subtitle: 'Monitor students and improve outcomes.',
        stats: {
          totalStudents: { count: '1,245', numeric: 1245, label: 'Total Students' },
          activePrograms: { count: '32', numeric: 32, label: 'Active Programs' },
          internships: { count: '85', numeric: 85, label: 'Internships' },
          placements: { count: '62', numeric: 62, label: 'Placements' },
        },
        skillAnalytics: [
          { skill: 'AI/ML', count: 380, averageScore: 78 },
          { skill: 'Web Dev', count: 1120, averageScore: 89 },
          { skill: 'DSA', count: 850, averageScore: 82 },
          { skill: 'DBMS', count: 940, averageScore: 85 },
          { skill: 'Cloud', count: 520, averageScore: 74 },
        ],
        recentUpdates: [
          { id: '1', title: 'New Training Program added', time: '2h ago', category: 'training' },
          { id: '2', title: 'Internship Drive - TechCorp', time: '1d ago', category: 'internship' },
          { id: '3', title: 'Placement Drive - TCS', time: '2d ago', category: 'placement' },
        ],
      },
    },
    students: {
      success: true,
      data: [
        { id: '1', name: 'Harsh Gajre', roll: 'CSE-001', email: 'harsh@gmail.com', skills: 12, placement: 'Placed' },
        { id: '2', name: 'Priya Singh', roll: 'CSE-002', email: 'priya@gmail.com', skills: 8, placement: 'In Process' },
        { id: '3', name: 'Arjun Kumar', roll: 'CSE-003', email: 'arjun@gmail.com', skills: 15, placement: 'Placed' },
      ],
    },
    analytics: {
      success: true,
      data: {
        skillTrends: [
          { month: 'Jan', 'AI/ML': 45, 'Web Dev': 52, DSA: 48 },
          { month: 'Feb', 'AI/ML': 52, 'Web Dev': 58, DSA: 55 },
          { month: 'Mar', 'AI/ML': 58, 'Web Dev': 65, DSA: 62 },
          { month: 'Apr', 'AI/ML': 65, 'Web Dev': 72, DSA: 70 },
        ],
      },
    },
    skillGap: {
      success: true,
      data: [
        { skill: 'JavaScript', industry: 95, current: 72, gap: 23 },
        { skill: 'React', industry: 88, current: 75, gap: 13 },
        { skill: 'Python', industry: 90, current: 68, gap: 22 },
        { skill: 'Cloud', industry: 85, current: 55, gap: 30 },
      ],
    },
    trainingPrograms: {
      success: true,
      data: [
        { id: '1', title: 'React Bootcamp', duration: '6 weeks', enrolled: 150, status: 'Active' },
        { id: '2', title: 'AI/ML Fundamentals', duration: '8 weeks', enrolled: 120, status: 'Active' },
        { id: '3', title: 'System Design', duration: '4 weeks', enrolled: 80, status: 'Upcoming' },
      ],
    },
    collaborations: {
      success: true,
      data: [
        { id: '1', company: 'TechCorp', type: 'MoU', status: 'Active', since: '2023-01-15' },
        { id: '2', company: 'CodeSoft', type: 'Internship Partner', status: 'Active', since: '2023-06-20' },
      ],
    },
    internships: {
      success: true,
      data: [
        { id: '1', company: 'TechCorp', position: 'Frontend Intern', count: 25, duration: '3 months' },
        { id: '2', company: 'StartupXYZ', position: 'Full Stack Intern', count: 15, duration: '2 months' },
      ],
    },
    placements: {
      success: true,
      data: {
        totalPlaced: 62,
        averagePackage: '7.5 LPA',
        highestPackage: '15 LPA',
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Wipro'],
      },
    },
  },

  // ============ COMPANY DATA ============
  company: {
    user: {
      id: 'com-001',
      name: 'Riya Patel',
      email: 'company@campus2career.com',
      role: 'company',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    dashboard: {
      success: true,
      data: {
        welcomeMessage: 'Welcome, Riya! 🏢',
        subtitle: 'Manage your hiring and talent pipeline.',
        stats: {
          openPositions: { count: '12', label: 'Open Positions' },
          applications: { count: '245', label: 'Applications' },
          shortlisted: { count: '45', label: 'Shortlisted' },
          hired: { count: '8', label: 'Hired' },
        },
        applicationsChart: [
          { name: 'Week 1', applications: 35 },
          { name: 'Week 2', applications: 52 },
          { name: 'Week 3', applications: 48 },
          { name: 'Week 4', applications: 61 },
        ],
      },
    },
    opportunities: {
      success: true,
      data: [
        { id: '1', title: 'Frontend Developer', location: 'Remote', type: 'Full-time', salary: '8-10 LPA', applications: 45 },
        { id: '2', title: 'Backend Engineer', location: 'Bangalore', type: 'Full-time', salary: '10-12 LPA', applications: 62 },
        { id: '3', title: 'React Intern', location: 'Mumbai', type: 'Internship', salary: '3-5 LPA', applications: 128 },
      ],
    },
    candidates: {
      success: true,
      data: [
        { id: '1', name: 'Harsh Gajre', skills: ['React', 'JavaScript', 'Node.js'], match: 92, status: 'Shortlisted' },
        { id: '2', name: 'Priya Singh', skills: ['Python', 'Django', 'PostgreSQL'], match: 85, status: 'Applied' },
        { id: '3', name: 'Arjun Kumar', skills: ['Java', 'Spring Boot', 'AWS'], match: 88, status: 'Interview' },
      ],
    },
    challenges: {
      success: true,
      data: [
        { id: '1', title: 'React Todo App', difficulty: 'Easy', submissions: 120, prize: '₹5000' },
        { id: '2', title: 'E-commerce Backend', difficulty: 'Hard', submissions: 45, prize: '₹25000' },
      ],
    },
    shortlisted: {
      success: true,
      data: [
        { id: '1', name: 'Harsh Gajre', position: 'Frontend Developer', skills: ['React', 'JavaScript'], rating: 9 },
        { id: '2', name: 'Priya Singh', position: 'Backend Engineer', skills: ['Python', 'Django'], rating: 8 },
      ],
    },
    interviews: {
      success: true,
      data: [
        { id: '1', candidate: 'Harsh Gajre', position: 'Frontend Developer', date: '2024-09-15', time: '10:00 AM', status: 'Scheduled' },
        { id: '2', candidate: 'Priya Singh', position: 'Backend Engineer', date: '2024-09-16', time: '2:00 PM', status: 'Scheduled' },
      ],
    },
    interns: {
      success: true,
      data: [
        { id: '1', name: 'Harsh Gajre', position: 'React Intern', mentor: 'Senior Dev', startDate: '2024-08-01', rating: 4.5 },
        { id: '2', name: 'Priya Singh', position: 'Backend Intern', mentor: 'Backend Lead', startDate: '2024-08-05', rating: 4 },
      ],
    },
    skillRequirements: {
      success: true,
      data: [
        { id: '1', position: 'Frontend Developer', skills: ['React', 'JavaScript', 'CSS'], minScore: 75 },
        { id: '2', position: 'Backend Engineer', skills: ['Python', 'Django', 'PostgreSQL'], minScore: 80 },
      ],
    },
  },

  // ============ ADMIN DATA ============
  admin: {
    user: {
      id: 'adm-001',
      name: 'Super Admin',
      email: 'admin@campus2career.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    },
    dashboard: {
      success: true,
      data: {
        welcomeMessage: 'Welcome, Admin! 👨‍💼',
        subtitle: 'Platform Overview & Management',
        stats: {
          totalUsers: { count: '5,234', label: 'Total Users' },
          activeStudents: { count: '3,124', label: 'Active Students' },
          companies: { count: '245', label: 'Companies' },
          colleges: { count: '120', label: 'Colleges' },
        },
        platformGrowth: [
          { month: 'Jan', users: 1200, companies: 45, colleges: 25 },
          { month: 'Feb', users: 1850, companies: 62, colleges: 35 },
          { month: 'Mar', users: 2500, companies: 85, colleges: 48 },
          { month: 'Apr', users: 3500, companies: 120, colleges: 72 },
          { month: 'May', users: 4200, companies: 180, colleges: 95 },
          { month: 'Jun', users: 5234, companies: 245, colleges: 120 },
        ],
      },
    },
    students: {
      success: true,
      data: [
        { id: '1', name: 'Harsh Gajre', email: 'harsh@gmail.com', college: 'MIT Institute', status: 'Active', verified: true },
        { id: '2', name: 'Priya Singh', email: 'priya@gmail.com', college: 'IIT Delhi', status: 'Active', verified: true },
      ],
    },
    companies: {
      success: true,
      data: [
        { id: '1', name: 'TechCorp', industry: 'Software', location: 'Bangalore', status: 'Verified', hirings: 12 },
        { id: '2', name: 'StartupXYZ', industry: 'AI/ML', location: 'Pune', status: 'Verified', hirings: 8 },
      ],
    },
    colleges: {
      success: true,
      data: [
        { id: '1', name: 'MIT Institute', location: 'Pune', students: 2500, status: 'Verified' },
        { id: '2', name: 'IIT Delhi', location: 'Delhi', students: 3000, status: 'Verified' },
      ],
    },
    opportunities: {
      success: true,
      data: [
        { id: '1', title: 'Frontend Developer', company: 'TechCorp', status: 'Active', applications: 85 },
        { id: '2', title: 'React Intern', company: 'StartupXYZ', status: 'Active', applications: 120 },
      ],
    },
    skills: {
      success: true,
      data: [
        { id: '1', name: 'JavaScript', category: 'Frontend', demandTier: 'High', verified: true },
        { id: '2', name: 'React', category: 'Frontend', demandTier: 'High', verified: true },
        { id: '3', name: 'Python', category: 'Backend', demandTier: 'Very High', verified: true },
      ],
    },
    challenges: {
      success: true,
      data: [
        { id: '1', title: 'React Calculator', status: 'Active', submissions: 120 },
        { id: '2', title: 'E-commerce Backend', status: 'Active', submissions: 45 },
      ],
    },
    analytics: {
      success: true,
      data: {
        userStats: {
          totalRegistrations: 5234,
          monthlyGrowth: '8.5%',
          activeUsers: 4200,
        },
        placementStats: {
          totalPlaced: 1240,
          placementRate: '78%',
          averagePackage: '7.5 LPA',
        },
      },
    },
  },

  // ============ COMMON/PUBLIC DATA ============
  public: {
    opportunities: {
      success: true,
      data: [
        { id: '1', title: 'Frontend Developer', company: 'TechCorp', type: 'Full-time', location: 'Remote', salary: '8-10 LPA', skills: ['React', 'JavaScript'] },
        { id: '2', title: 'React Intern', company: 'StartupXYZ', type: 'Internship', location: 'Bangalore', salary: '3-5 LPA', skills: ['React', 'JavaScript'] },
        { id: '3', title: 'Backend Developer', company: 'CodeSoft', type: 'Full-time', location: 'Mumbai', salary: '9-11 LPA', skills: ['Node.js', 'Python'] },
      ],
    },
    challenges: {
      success: true,
      data: [
        { id: '1', title: 'React Todo App', difficulty: 'Easy', company: 'TechCorp', prize: '₹5000', submissions: 120 },
        { id: '2', title: 'E-commerce Backend', difficulty: 'Hard', company: 'StartupXYZ', prize: '₹25000', submissions: 45 },
      ],
    },
  },
};

// Helper function to get mock data based on path
export const getMockDataForPath = (path) => {
  if (path.includes('/students/')) return mockData.student;
  if (path.includes('/colleges/')) return mockData.college;
  if (path.includes('/companies/')) return mockData.company;
  if (path.includes('/admin/')) return mockData.admin;
  return mockData.public;
};
