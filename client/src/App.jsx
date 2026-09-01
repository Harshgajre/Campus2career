import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import { PublicLayout } from './layouts/PublicLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterStudentPage } from './pages/public/RegisterStudentPage';
import { RegisterCollegePage } from './pages/public/RegisterCollegePage';
import { RegisterCompanyPage } from './pages/public/RegisterCompanyPage';
import { AdminLoginPage } from './pages/public/AdminLoginPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MySkills } from './pages/student/MySkills';
import { MyProjects } from './pages/student/MyProjects';
import { SkillChallenges } from './pages/student/SkillChallenges';
import { LearningRoadmap } from './pages/student/LearningRoadmap';
import { Opportunities } from './pages/student/Opportunities';
import { MyApplications } from './pages/student/MyApplications';
import { SkillPassport } from './pages/student/SkillPassport';

// College Pages
import { CollegeDashboard } from './pages/college/CollegeDashboard';
import { StudentsList } from './pages/college/StudentsList';
import { SkillAnalytics } from './pages/college/SkillAnalytics';
import { SkillGap } from './pages/college/SkillGap';
import { TrainingPrograms } from './pages/college/TrainingPrograms';
import { IndustryCollaboration } from './pages/college/IndustryCollaboration';
import { Internships } from './pages/college/Internships';
import { Placements } from './pages/college/Placements';

// Company Pages
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { CompanyOpportunities } from './pages/company/CompanyOpportunities';
import { CandidatesSearch } from './pages/company/CandidatesSearch';
import { SkillRequirements } from './pages/company/SkillRequirements';
import { CompanyChallenges } from './pages/company/CompanyChallenges';
import { ShortlistedCandidates } from './pages/company/ShortlistedCandidates';
import { Interviews } from './pages/company/Interviews';
import { ActiveInterns } from './pages/company/ActiveInterns';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageStudents } from './pages/admin/ManageStudents';
import { ManageCompanies } from './pages/admin/ManageCompanies';
import { ManageColleges } from './pages/admin/ManageColleges';
import { ManageOpportunities } from './pages/admin/ManageOpportunities';
import { ManageSkills } from './pages/admin/ManageSkills';
import { ManageChallenges } from './pages/admin/ManageChallenges';
import { AnalyticsReports } from './pages/admin/AnalyticsReports';

// ─── Protected Route ──────────────────────────────────────────────────────────
// Redirects unauthenticated users to /login
// Prevents users accessing another role's panel
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1D]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Loading Campus2Career…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to the user's own dashboard if they try to access another role's panel
    const dashboardMap = {
      student: '/student/dashboard',
      college: '/college/dashboard',
      company: '/company/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={dashboardMap[user.role] || '/login'} replace />;
  }

  return children;
};

// ─── Root redirect ────────────────────────────────────────────────────────────
// Sends authenticated users to their dashboard, else to landing page
const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1D]">
        <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (user) {
    const dashboardMap = {
      student: '/student/dashboard',
      college: '/college/dashboard',
      company: '/company/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={dashboardMap[user.role] || '/student/dashboard'} replace />;
  }

  return <Navigate to="/" replace />;
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* ── Public Routes ─────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/student" element={<RegisterStudentPage />} />
        <Route path="/register/college" element={<RegisterCollegePage />} />
        <Route path="/register/company" element={<RegisterCompanyPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>

      {/* ── Dashboard (Protected) Routes ──────────────── */}
      <Route element={<DashboardLayout />}>

        {/* Student Panel */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/skills"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MySkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/projects"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MyProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/challenges"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <SkillChallenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/roadmap"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <LearningRoadmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/opportunities"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Opportunities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/applications"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/passport"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <SkillPassport />
            </ProtectedRoute>
          }
        />

        {/* College Panel */}
        <Route
          path="/college/dashboard"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <CollegeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/students"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <StudentsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/analytics"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <SkillAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/skill-gap"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <SkillGap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/training-programs"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <TrainingPrograms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/collaborations"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <IndustryCollaboration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/internships"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <Internships />
            </ProtectedRoute>
          }
        />
        <Route
          path="/college/placements"
          element={
            <ProtectedRoute allowedRoles={['college']}>
              <Placements />
            </ProtectedRoute>
          }
        />

        {/* Company Panel */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/opportunities"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyOpportunities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/candidates"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CandidatesSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/skill-requirements"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <SkillRequirements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/challenges"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyChallenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/shortlisted"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <ShortlistedCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/interviews"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <Interviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/interns"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <ActiveInterns />
            </ProtectedRoute>
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/colleges"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageColleges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/opportunities"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageOpportunities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageSkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/challenges"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageChallenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AnalyticsReports />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ── Catch-all / 404 ───────────────────────────── */}
      <Route path="/dashboard" element={<RootRedirect />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0A0F1D] gap-4">
            <h1 className="text-6xl font-black text-slate-200 dark:text-slate-800">404</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Page not found – this route doesn't exist.
            </p>
            <a
              href="/"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all"
            >
              Back to Home
            </a>
          </div>
        }
      />
    </Routes>
  );
}
