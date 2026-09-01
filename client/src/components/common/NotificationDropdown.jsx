import React from 'react';
import { Bell, Briefcase, Trophy, Award, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationDropdown = ({ onClose, role }) => {
  const notifications = [
    {
      id: '1',
      title: 'Interview Scheduled',
      message: 'TechCorp scheduled Technical Round 1 for Sep 10, 11:00 AM.',
      time: '2h ago',
      icon: Briefcase,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
      link: '/student/applications',
    },
    {
      id: '2',
      title: 'New Skill Challenge',
      message: 'SIH AI Skill Passport Verifier challenge is now live with ₹50,000 prize!',
      time: '1d ago',
      icon: Trophy,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
      link: '/student/challenges',
    },
    {
      id: '3',
      title: 'Skill Verified',
      message: 'Your React.js competency has been verified by the campus coordinator.',
      time: '2d ago',
      icon: Award,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
      link: '/student/skills',
    },
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-500" />
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Notifications</h4>
        </div>
        <button
          onClick={onClose}
          className="text-[11px] text-blue-500 hover:text-blue-600 font-medium"
        >
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.link}
              onClick={onClose}
              className="flex items-start gap-3 p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
            >
              <div className={`p-2 rounded-xl flex-shrink-0 ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 inline-block">
                  {item.time}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="px-4 pt-2 pb-1 border-t border-slate-100 dark:border-slate-800/80 text-center">
        <span className="text-[11px] text-slate-400">All notifications up to date</span>
      </div>
    </div>
  );
};
