import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { SettingsModal } from './SettingsModal';

export const Header = ({ onToggleSidebar, role = 'student' }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleTitleMapping = {
    student: 'Student',
    college: 'College Admin',
    company: 'HR Manager',
    admin: 'Administrator',
  };

  const displayName = user?.name || (role === 'student' ? 'Harsh Gajre' : role === 'college' ? 'Dr. Mehta' : role === 'company' ? 'Riya Patel' : 'Super Admin');
  const displayRole = roleTitleMapping[role] || 'Member';
  const displayAvatar = user?.avatar || (role === 'student'
    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    : role === 'college'
    ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    : role === 'company'
    ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200');

  return (
    <>
      <header className="h-16 bg-white dark:bg-[#0E172E] border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30 transition-colors duration-200 flex items-center justify-between px-4 sm:px-6">
        {/* Left Side: Mobile Menu Button & Platform Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 focus:outline-none lg:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side: Theme Toggle, Profile Section */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Light / Dark Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* User Profile Avatar Section */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2.5 p-1 sm:px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors text-left"
            >
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  {displayName}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  {displayRole}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 ml-0.5" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 sm:hidden">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{displayName}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{displayRole}</p>
                </div>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setShowSettingsModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  Settings
                </button>

                <button
                  onClick={() => {
                    toggleTheme();
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-400" />}
                    Theme Preference
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {theme}
                  </span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800/80"></div>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    logout();
                    window.location.href = '/';
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} role={role} />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}
    </>
  );
};
