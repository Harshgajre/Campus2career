import React from 'react';

export const CircularProgress = ({
  percentage = 75,
  size = 140,
  strokeWidth = 10,
  label = 'Overall Progress',
  role = 'student',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const roleColors = {
    student: {
      stroke: '#3B82F6',
      track: '#DBEAFE',
      darkTrack: '#1E293B',
      glow: 'filter drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))',
      textColor: 'text-blue-500',
    },
    college: {
      stroke: '#8B5CF6',
      track: '#EDE9FE',
      darkTrack: '#1E293B',
      glow: 'filter drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))',
      textColor: 'text-purple-500',
    },
    company: {
      stroke: '#10B981',
      track: '#D1FAE5',
      darkTrack: '#1E293B',
      glow: 'filter drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))',
      textColor: 'text-emerald-500',
    },
    admin: {
      stroke: '#F97316',
      track: '#FFEDD5',
      darkTrack: '#1E293B',
      glow: 'filter drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))',
      textColor: 'text-orange-500',
    },
  };

  const config = roleColors[role] || roleColors.student;

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Foreground Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={config.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.35))',
            }}
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {percentage}%
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
};
