# 🎓 Campus2Career — Skill-to-Industry Career Ecosystem

<div align="center">

![Campus2Career](https://img.shields.io/badge/Campus2Career-v1.0.0-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb)

**A premium full-stack web application bridging academia and industry through AI-driven Skill Passports, automated gap analysis, verified challenges, and seamless placement pipelines.**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#-prerequisites)
- [Environment Setup](#-environment-setup)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Seeding Demo Data](#-seeding-demo-data)
- [Demo Login Credentials](#-demo-login-credentials)
- [Role Panels](#-role-panels)
- [API Overview](#-api-overview)
- [Git & Deployment](#-git--deployment)

---

## 🎯 Overview

**Campus2Career** is a comprehensive career ecosystem platform that connects four key stakeholders:

| Stakeholder | Role | Color |
|------------|------|-------|
| 🎓 Students | Build skill passport, apply to opportunities, track progress | Blue (#3B82F6) |
| 🏛️ Colleges | Monitor placements, analyze skill gaps, run training programs | Purple (#8B5CF6) |
| 🏢 Companies | Post opportunities, discover talent, schedule interviews | Green (#10B981) |
| 🛡️ Admin | Manage all platform entities and monitor ecosystem health | Orange (#F97316) |

---

## ✨ Features

### Student Panel
- 📊 **Dashboard** — Real-time skill progress, placement readiness, and activity feed
- 🔑 **My Skills** — CRUD skill management with proficiency levels and categories
- 💼 **My Projects** — Portfolio management with GitHub/live links and tech stack pills
- 🏆 **Skill Challenges** — Hackathon listings with difficulty badges and solution submission
- 🗺️ **Learning Roadmap** — Milestone progress tracker with industry course recommendations
- 🔎 **Opportunities** — Job/internship search with type, location, and skill filters
- 📋 **My Applications** — Status timeline tracking (Applied → Under Review → Interview → Offered)
- 📜 **Skill Passport** — Verifiable cryptographic digital passport with QR code, Radar chart, downloadable & printable

### College Panel
- 📊 **Dashboard** — Student metrics, skill analytics spline chart, recent updates
- 👥 **Students** — Full roster with competency tracking and passport preview
- 📈 **Skill Analytics** — Recharts powered departmental analysis and 6-month trend lines
- 🔍 **Skill Gap Analysis** — Industry demand vs. campus proficiency benchmark matrix
- 📚 **Training Programs** — Full CRUD for bootcamps with enrollment tracking
- 🤝 **Industry Collaboration** — MoU tracking with partner companies
- 💼 **Internships** — Real-time intern drive tracker
- 🎓 **Placements** — CTC statistics, highest package, placement rate dashboard

### Company Panel
- 📊 **Dashboard** — Applications overview green spline chart, recent candidate applications
- 📢 **Opportunities** — Full CRUD for job and internship postings
- 🔎 **Candidates** — Verified talent pool with smart skill-based search
- 🎯 **Skill Requirements** — Role benchmark criteria engine with minimum score thresholds
- 🏆 **Skill Challenges** — Create and evaluate company-sponsored hackathons
- ⭐ **Shortlisted Candidates** — Compare candidates side-by-side
- 📅 **Interviews** — Full scheduling system with Google Meet integration
- 👔 **Active Interns** — Mentor assignment and performance tracking

### Admin Panel
- 📊 **Dashboard** — Platform KPIs, orange spline growth chart, recent activities
- 👥 **Manage Students** — Identity audit, status management, verification flags
- 🏢 **Manage Companies** — Business domain verification, recruiter portal authorization
- 🏛️ **Manage Colleges** — AISHE code validation, campus approval workflows
- 📢 **Manage Opportunities** — Global listing moderation
- 🔑 **Manage Skills** — Master taxonomy CRUD with demand tier classification
- 🏆 **Manage Challenges** — Hackathon moderation and prize bounty auditing
- 📊 **Analytics & Reports** — Multi-stakeholder growth KPIs, export as PDF

### System Features
- 🔐 **JWT Authentication** with bcryptjs password hashing
- 🛡️ **Role-Based Access Control** (RBAC) — unauthorized cross-role access blocked
- 🌙 **Light / Dark Theme** toggle with localStorage persistence
- 📱 **Fully Responsive** — Mobile sidebar drawer, collapsible desktop sidebar
- 🔔 **Notification System** with real-time bell dropdown
- 1️⃣ **Demo Login Buttons** for all 4 roles on the Login page
- 💾 **Comprehensive Seed Script** with realistic demo data

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3 | UI framework |
| Vite | 5.2 | Build tool & dev server |
| React Router DOM | 6.23 | Client-side routing |
| Tailwind CSS | 3.4 | Utility-first styling |
| Recharts | 2.12 | Data visualization charts |
| Lucide React | 0.395 | Icon library |
| Axios | 1.7 | HTTP API client |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.19 | Web framework |
| MongoDB | 7+ | NoSQL database |
| Mongoose | 8.4 | MongoDB ODM |
| bcryptjs | 2.4 | Password hashing |
| JSON Web Token | 9.0 | Authentication tokens |
| Morgan | 1.10 | HTTP request logging |
| dotenv | 16.4 | Environment variables |
| nodemon | 3.1 | Dev auto-restart |
| concurrently | 8.2 | Parallel dev script runner |

---

## 📁 Folder Structure

```
Campus2career/
├── package.json                    # Root monorepo scripts
├── .gitignore
├── README.md
│
├── client/                         # React Frontend (Vite + Tailwind)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js              # Vite config with /api proxy
│   ├── tailwind.config.js          # Role color tokens, dark mode
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx                # React entry point
│       ├── App.jsx                 # React Router + Protected Routes
│       ├── index.css               # Global styles + animations
│       ├── context/
│       │   ├── AuthContext.jsx     # Auth state, login, logout, demo login
│       │   └── ThemeContext.jsx    # Dark/Light theme management
│       ├── services/
│       │   ├── api.js              # Axios instance with JWT interceptor
│       │   ├── authService.js      # Auth API calls
│       │   └── roleServices.js     # Role-specific API calls (student/college/company/admin)
│       ├── components/
│       │   └── common/
│       │       ├── Sidebar.jsx     # Role-aware sidebar with pill navigation
│       │       ├── Header.jsx      # Top bar: notifications, theme toggle, profile dropdown
│       │       ├── StatCard.jsx    # Metric stat card
│       │       ├── ChartCard.jsx   # Recharts wrapper card
│       │       ├── DataTable.jsx   # Searchable paginated table
│       │       ├── Modal.jsx       # Reusable modal dialog
│       │       ├── Badge.jsx       # Status badges
│       │       ├── CircularProgress.jsx
│       │       ├── ProfileModal.jsx
│       │       ├── SettingsModal.jsx
│       │       └── NotificationDropdown.jsx
│       ├── layouts/
│       │   ├── DashboardLayout.jsx # Sidebar + Header + Outlet
│       │   └── PublicLayout.jsx    # Public pages wrapper
│       └── pages/
│           ├── public/             # Landing, Login, Register pages
│           ├── student/            # 8 student panel pages
│           ├── college/            # 8 college panel pages
│           ├── company/            # 8 company panel pages
│           └── admin/              # 8 admin panel pages
│
└── server/                         # Express.js Backend
    ├── server.js                   # Main server entry point
    ├── package.json
    ├── .env                        # Private environment variables
    ├── .env.example                # Environment template
    ├── config/
    │   └── db.js                   # MongoDB connection
    ├── middleware/
    │   ├── authMiddleware.js        # JWT verify + protect
    │   ├── roleMiddleware.js        # Role-based access control
    │   └── errorHandler.js         # Global error handler
    ├── models/                     # 15 Mongoose schemas
    │   ├── User.js, Student.js, College.js, Company.js
    │   ├── Skill.js, Project.js, Opportunity.js, Application.js
    │   ├── Challenge.js, ChallengeSubmission.js, TrainingProgram.js
    │   ├── Interview.js, Internship.js, Placement.js, Notification.js
    ├── controllers/                # 8 business logic controllers
    ├── routes/                     # 8 Express route files
    ├── utils/
    │   └── generateToken.js        # JWT token utility
    └── seeds/
        └── seedData.js             # Database seeder with demo data
```

---

## ✅ Prerequisites

Before starting, ensure you have installed:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- **MongoDB** — Either:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud cluster — recommended)
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local install)
- **Git** — [Download](https://git-scm.com/)

---

## ⚙️ Environment Setup

### 1. Configure the Backend `.env`

Navigate to the `server/` directory and create your `.env` file:

```bash
cd server
copy .env.example .env
```

Then open `server/.env` and fill in your values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_very_long_secure_random_jwt_secret_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Getting your MongoDB URI:**

- **Atlas (Cloud):** Create a free cluster → Connect → Connect your application → Copy URI
  - Replace `<password>` with your database user password
  - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/campus2career?retryWrites=true&w=majority`
- **Local MongoDB:** `mongodb://127.0.0.1:27017/campus2career`

---

## 📦 Installation

Install all dependencies for the root, server, and client in one command:

```bash
# From the root Campus2career/ directory
npm run install-all
```

This runs `npm install` in `Campus2career/`, `Campus2career/server/`, and `Campus2career/client/` automatically.

**Alternatively, install manually:**
```bash
npm install              # Root (installs concurrently)
cd server && npm install # Backend
cd ../client && npm install # Frontend
```

---

## 🚀 Running the Project

### Development Mode (Frontend + Backend simultaneously)

From the root `Campus2career/` directory:

```bash
npm run dev
```

This uses `concurrently` to start:
- 🔵 **Backend** at `http://localhost:5000` (Express API)
- 🟢 **Frontend** at `http://localhost:5173` (Vite dev server)

The Vite proxy automatically forwards all `/api/*` requests to the backend.

### Individual Servers

```bash
# Backend only
npm run server

# Frontend only
npm run client

# Production build (frontend)
npm run build
```

---

## 🌱 Seeding Demo Data

Populate the database with realistic demo data including students, colleges, companies, skills, opportunities, challenges, and more:

```bash
# From root directory
npm run seed

# Or directly
cd server && node seeds/seedData.js
```

> ⚠️ **WARNING:** The seed script **deletes all existing data** before inserting fresh demo data. Do not run on production.

---

## 🔑 Demo Login Credentials

After seeding, use these credentials to log in and explore each panel:

| Role | Email | Password | Panel |
|------|-------|----------|-------|
| 👨‍🎓 **Student** | `harsh@campus2career.com` | `password123` | `/student/dashboard` |
| 🏛️ **College** | `mehta@campus2career.com` | `password123` | `/college/dashboard` |
| 🏢 **Company** | `riya@techcorp.com` | `password123` | `/company/dashboard` |
| 🛡️ **Admin** | `admin@campus2career.com` | `password123` | `/admin/dashboard` |

> 💡 **Quick Access:** Use the **1-click Demo Login buttons** on the Login page to instantly authenticate as any role without typing credentials.

---

## 🧭 Role Panels

| URL Prefix | Role | Accessible To |
|-----------|------|---------------|
| `/student/*` | Student Panel | Authenticated students only |
| `/college/*` | College Panel | Authenticated colleges only |
| `/company/*` | Company Panel | Authenticated companies only |
| `/admin/*` | Admin Panel | Authenticated admins only |

> Protected routes enforce **role-based access control** — a Student trying to access `/college/dashboard` will be automatically redirected to their own `/student/dashboard`.

---

## 🔌 API Overview

All API endpoints are prefixed with `/api`. The Vite dev proxy forwards these to `http://localhost:5000`.

| Route Prefix | Description |
|-------------|-------------|
| `POST /api/auth/login` | Universal login for all roles |
| `POST /api/auth/demo-login` | 1-click demo login |
| `POST /api/auth/register-student` | Student registration |
| `GET /api/auth/me` | Get current authenticated user |
| `GET /api/students/dashboard` | Student dashboard telemetry |
| `GET/POST /api/students/skills` | Skill CRUD |
| `GET/POST /api/students/projects` | Project CRUD |
| `GET /api/students/passport` | Digital Skill Passport data |
| `GET /api/colleges/dashboard` | College dashboard telemetry |
| `GET /api/colleges/analytics` | Skill analytics data |
| `GET /api/colleges/skill-gap` | Skill gap matrix |
| `GET/POST /api/colleges/training-programs` | Training programs CRUD |
| `GET /api/companies/dashboard` | Company dashboard telemetry |
| `GET/POST /api/companies/opportunities` | Opportunities CRUD |
| `GET /api/companies/candidates` | Talent pool search |
| `GET/POST /api/companies/interviews` | Interview scheduling |
| `GET /api/admin/dashboard` | Admin platform telemetry |
| `GET /api/admin/students` | Manage students |
| `GET /api/admin/skills` | Master skills catalog |
| `GET /api/opportunities` | Public opportunity listings |
| `GET /api/challenges` | Public challenges listing |
| `GET /api/notifications` | User notifications |

---

## 🐙 Git & Deployment

### Initialize Git Repository

```bash
# From the root Campus2career/ directory
git init
git add .
git commit -m "feat: initial commit - Campus2Career full-stack MERN application"
```

### Push to GitHub

```bash
git remote add origin https://github.com/your-username/Campus2Career.git
git branch -M main
git push -u origin main
```

### What's in `.gitignore`

The following are **excluded** from version control:
```
node_modules/          # All dependency folders
server/.env            # Your private environment variables
client/dist/           # Production build output
*.log                  # Log files
```

> ✅ Only commit the `.env.example` file — **never** commit the actual `.env` with your real MongoDB URI and JWT secret.

---

## 📄 License

MIT License — Campus2Career Team © 2026

---

<div align="center">
Built with ❤️ by the Campus2Career Team | Powered by MERN Stack + Tailwind CSS + Recharts
</div>
