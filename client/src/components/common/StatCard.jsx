import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  role = 'student',
  trend,
  className = '',
}) => {
  const accentBorders = {
    student: 'hover:border-blue-500/50 group-hover:text-blue-500',
    college: 'hover:border-purple-500/50 group-hover:text-purple-500',
    company: 'hover:border-emerald-500/50 group-hover:text-emerald-500',
    admin: 'hover:border-orange-500/50 group-hover:text-orange-500',
  };

  return (
    <div
      className={`bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md group ${accentBorders[role]} ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
          {title}
        </span>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-400 group-hover:text-current transition-colors">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {value}
        </h3>
        {trend && (
          <span className="text-[11px] font-semibold text-emerald-500 flex items-center gap-0.5">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};
