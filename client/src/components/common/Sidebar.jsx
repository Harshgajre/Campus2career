import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import c2cLogoLight from '../../assets/c2c-logo-light.png';
import c2cLogoDark from '../../assets/c2c-logo-dark.png';
import {
  LayoutDashboard,
  Sparkles,
  FolderGit2,
  Trophy,
  Map,
  Briefcase,
  FileText,
  Award,
  User,
  Users,
  BarChart3,
  GitCompare,
  BookOpen,
  Building2,
  GraduationCap,
  Target,
  UserCheck,
  Calendar,
  UserPlus,
  TrendingUp,
  X,
  ChevronRight,
} from 'lucide-react';

export const Sidebar = ({ role = 'student', isOpen, onClose, isCollapsed }) => {
  const location = useLocation();

  // Define role metadata & color scheme
  const roleConfig = {
    student: {
      title: 'STUDENT PANEL',
      accentColor: '#7C3AED',
      activeClass: 'bg-purple-600 text-white shadow-md shadow-purple-500/20 font-medium',
      inactiveClass: 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-purple-950/30',
      tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
      iconColor: 'text-purple-500',
      navItems: [
        { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
        { name: 'My Skills', path: '/student/skills', icon: Sparkles },
        { name: 'My Projects', path: '/student/projects', icon: FolderGit2 },
        { name: 'Skill Challenges', path: '/student/challenges', icon: Trophy },
        { name: 'Learning Roadmap', path: '/student/roadmap', icon: Map },
        { name: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
        { name: 'My Applications', path: '/student/applications', icon: FileText },
        { name: 'Profile', path: '/student/passport', icon: User },
      ],
    },
    college: {
      title: 'COLLEGE PANEL',
      accentColor: '#2563EB',
      activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-medium',
      inactiveClass: 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/30',
      tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      iconColor: 'text-blue-500',
      navItems: [
        { name: 'Dashboard', path: '/college/dashboard', icon: LayoutDashboard },
        { name: 'Students', path: '/college/students', icon: Users },
        { name: 'Skill Analytics', path: '/college/analytics', icon: BarChart3 },
        { name: 'Skill Gap', path: '/college/skill-gap', icon: GitCompare },
        { name: 'Training Programs', path: '/college/training-programs', icon: BookOpen },
        { name: 'Industry Collaboration', path: '/college/collaborations', icon: Building2 },
        { name: 'Internships', path: '/college/internships', icon: Briefcase },
        { name: 'Placements', path: '/college/placements', icon: Award },
      ],
    },
    company: {
      title: 'COMPANY / INDUSTRY PANEL',
      accentColor: '#10B981',
      activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-medium',
      inactiveClass: 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30',
      tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      iconColor: 'text-emerald-500',
      navItems: [
        { name: 'Dashboard', path: '/company/dashboard', icon: LayoutDashboard },
        { name: 'Opportunities', path: '/company/opportunities', icon: Briefcase },
        { name: 'Candidates', path: '/company/candidates', icon: Users },
        { name: 'Skill Requirements', path: '/company/skill-requirements', icon: Target },
        { name: 'Skill Challenges', path: '/company/challenges', icon: Trophy },
        { name: 'Shortlisted Candidates', path: '/company/shortlisted', icon: UserCheck },
        { name: 'Interviews', path: '/company/interviews', icon: Calendar },
        { name: 'Active Interns', path: '/company/interns', icon: UserPlus },
      ],
    },
    admin: {
      title: 'ADMIN PANEL',
      accentColor: '#F97316',
      activeClass: 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-medium',
      inactiveClass: 'text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50/60 dark:hover:bg-orange-950/30',
      tagColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
      iconColor: 'text-orange-500',
      navItems: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Students', path: '/admin/students', icon: Users },
        { name: 'Companies', path: '/admin/companies', icon: Building2 },
        { name: 'Colleges', path: '/admin/colleges', icon: GraduationCap },
        { name: 'Opportunities', path: '/admin/opportunities', icon: Briefcase },
        { name: 'Skills', path: '/admin/skills', icon: Sparkles },
        { name: 'Challenges', path: '/admin/challenges', icon: Trophy },
        { name: 'Analytics & Reports', path: '/admin/analytics', icon: TrendingUp },
      ],
    },
  };

  const currentRole = roleConfig[role] || roleConfig.student;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-white dark:bg-[#0E172E] border-slate-200 dark:border-slate-800/80
        `}
      >
        {/* Top Header & Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo Icon */}
            <img
              src={c2cLogoDark}
              alt="Campus2Career Logo"
              className="block dark:hidden h-8 w-auto flex-shrink-0 object-contain"
            />
            <img
              src={c2cLogoLight}
              alt="Campus2Career Logo"
              className="hidden dark:block h-8 w-auto flex-shrink-0 object-contain"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5 whitespace-nowrap">
                  {currentRole.title}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Campus2Career
                </span>
              </div>
            )}
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
          {currentRole.navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs tracking-wide transition-all duration-150 group relative
                  ${isActive ? currentRole.activeClass : currentRole.inactiveClass}
                  ${isCollapsed ? 'justify-center px-0' : ''}
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Status / Compact Badge */}
        {!isCollapsed && (
          <div className="p-3 m-3 rounded-xl bg-slate-50 dark:bg-[#131F3B] border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">Platform Online</span>
            </div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold bg-slate-200/60 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              v1.0
            </span>
          </div>
        )}
      </aside>
    </>
  );
};
