import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const PublicLayout = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1D] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      {/* Public Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0E172E]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 group-hover:scale-105 transition-transform">
              C2C
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              Campus2Career
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Link to="/#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Platform Features
            </Link>
            <Link to="/#passports" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Skill Passport
            </Link>
            <Link to="/#ecosystem" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Ecosystem
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {location.pathname !== '/login' && (
              <Link
                to="/login"
                className="text-xs font-semibold px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/login"
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
            >
              Launch App
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Public Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-white dark:bg-[#0E172E] border-t border-slate-200/80 dark:border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-200">Campus2Career</span>
            <span>• SIH Finalist Career Ecosystem</span>
          </div>
          <p>© 2026 Campus2Career Platform. Built for Students, Colleges, Companies & Administrators.</p>
        </div>
      </footer>
    </div>
  );
};
