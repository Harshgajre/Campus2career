import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, LogOut, User, Settings } from 'lucide-react';
import { ProfileModal } from '../components/common/ProfileModal';

export const PublicLayout = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showProfileDropdown]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileDropdown(false);
  };

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

            {/* Not Logged In - Show Sign In */}
            {!user ? (
              location.pathname !== '/login' && (
                <Link
                  to="/login"
                  className="text-xs font-semibold px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
              )
            ) : (
              /* Logged In - Show Profile Avatar and Name */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=40'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline max-w-[80px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-700 shadow-lg z-50">
                    {/* Profile Section */}
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>

                    {/* Settings Section */}
                    <button
                      onClick={() => {
                        // Settings functionality
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>

                    {/* Theme Toggle in Dropdown */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 transition-colors"
                    >
                      {isDark ? (
                        <Sun className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-slate-600" />
                      )}
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>

                    {/* Logout Section */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Public Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Profile Modal */}
      {showProfileModal && user && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          role={user.role}
        />
      )}

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
