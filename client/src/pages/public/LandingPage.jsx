import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();
  const [selectedDemoRole, setSelectedDemoRole] = useState('student');

  const handleQuickDemo = async (role) => {
    await demoLogin(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Glow ambient circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/10 blur-3xl rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Skill-to-Industry Career Ecosystem</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Bridging Student Skills with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Industry Demands
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Campus2Career unifies students, universities, enterprises, and platform administrators with verified digital skill passports, real-time curriculum gap analysis, and intelligent hiring pipelines.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all"
            >
              Explore Dashboards
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register/student"
              className="px-6 py-3 rounded-xl bg-white dark:bg-[#111C38] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              Create Student Account
            </Link>
          </div>

          {/* Interactive 1-Click Role Demonstrator Bar */}
          <div className="mt-14 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3.5 px-1 text-left">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  ⚡ 1-Click Instant Demo Portals
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select a role to preview its full-stack live dashboard:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleQuickDemo('student')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 font-semibold text-xs transition-all"
              >
                <Award className="w-4 h-4" />
                Student
              </button>

              <button
                onClick={() => handleQuickDemo('college')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 font-semibold text-xs transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                College
              </button>

              <button
                onClick={() => handleQuickDemo('company')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 font-semibold text-xs transition-all"
              >
                <Building2 className="w-4 h-4" />
                Company
              </button>

              <button
                onClick={() => handleQuickDemo('admin')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-orange-50 dark:bg-orange-950/50 hover:bg-orange-100 dark:hover:bg-orange-900/60 border border-orange-200 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 font-semibold text-xs transition-all"
              >
                <Users className="w-4 h-4" />
                Admin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Bar */}
      <section className="border-y border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#0E172E]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              12,500+
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Active Student Passports
            </p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
              250+
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Colleges & Universities
            </p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              800+
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Hiring Enterprise Partners
            </p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-orange-500">
              94.2%
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Placement & Internship Rate
            </p>
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section id="ecosystem" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            A Unified Ecosystem for Every Stakeholder
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Each role gets a dedicated, purpose-built dashboard with tailored telemetry and actions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Student Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-blue-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Student Panel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Build digital skill passports, showcase live projects, tackle hackathons, and apply for verified opportunities.
              </p>
            </div>
            <button
              onClick={() => handleQuickDemo('student')}
              className="mt-6 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
            >
              Open Student Portal <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* College Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-purple-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                College Panel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Track batch competency analytics, identify industry skill gaps, schedule bootcamps, and manage placements.
              </p>
            </div>
            <button
              onClick={() => handleQuickDemo('college')}
              className="mt-6 flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:gap-2 transition-all"
            >
              Open College Portal <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Company Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-emerald-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Company Panel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Post internships & jobs, search talent based on verified skill scores, sponsor challenges, and conduct interviews.
              </p>
            </div>
            <button
              onClick={() => handleQuickDemo('company')}
              className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
            >
              Open Company Portal <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Admin Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-orange-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Admin Panel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Oversee platform ecosystem growth, moderate catalogs, manage onboarding approvals, and audit platform KPIs.
              </p>
            </div>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="mt-6 flex items-center gap-1 text-xs font-semibold text-orange-500 hover:gap-2 transition-all"
            >
              Open Admin Portal <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
