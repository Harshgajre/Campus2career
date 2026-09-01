import React from 'react';

export const ChartCard = ({
  title,
  subtitle,
  actionText = 'View All',
  onAction,
  actionLink,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {(actionText || actionLink) && (
          <a
            href={actionLink || '#'}
            onClick={(e) => {
              if (onAction) {
                e.preventDefault();
                onAction();
              }
            }}
            className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {actionText}
          </a>
        )}
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
};
