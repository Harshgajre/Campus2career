import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, GraduationCap, Building2, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Main Content - Hero Section */}
      <section className="flex-1 relative overflow-hidden py-20 lg:py-32 flex items-center">
        {/* Ambient glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/10 blur-3xl rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight mb-6">
            Welcome to Campus2Career
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-16">
            Connecting students, colleges, and industry through an AI-driven ecosystem of skill passports, career opportunities, and intelligent matching.
          </p>

          {/* Three Large Clickable Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Student Option */}
            <Link
              to="/login"
              className="group relative p-8 rounded-2xl bg-white dark:bg-[#111C38] border-2 border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 flex flex-col items-center gap-4 text-center cursor-pointer"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="w-16 h-16 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Student
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Build your skill passport, explore opportunities, and advance your career.
                </p>
              </div>

              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all mt-4">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* College Option */}
            <Link
              to="/login"
              className="group relative p-8 rounded-2xl bg-white dark:bg-[#111C38] border-2 border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-blue-500/60 transition-all duration-300 flex flex-col items-center gap-4 text-center cursor-pointer"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  College
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage students, track skills, and bridge the industry gap.
                </p>
              </div>

              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all mt-4">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Company Option */}
            <Link
              to="/login"
              className="group relative p-8 rounded-2xl bg-white dark:bg-[#111C38] border-2 border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col items-center gap-4 text-center cursor-pointer"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="w-16 h-16 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Company / Industry
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Find top talent, post opportunities, and build teams efficiently.
                </p>
              </div>

              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm group-hover:gap-3 transition-all mt-4">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                College Panel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Track batch competency analytics, identify industry skill gaps, schedule bootcamps, and manage placements.
              </p>
            </div >
  <button
    onClick={() => handleQuickDemo('college')}
    className="mt-6 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
  >
    Open College Portal <ChevronRight className="w-4 h-4" />
  </button>
          </div >

  {/* Company Card */ }
  < div className = "p-6 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-emerald-500/60 transition-all flex flex-col justify-between" >
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
          </div >

  {/* Admin Card */ }
  < div className = "p-6 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-orange-500/60 transition-all flex flex-col justify-between" >
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
          </div >
        </div >
      </section >
    </div >
  );
};
