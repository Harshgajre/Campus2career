import React from 'react';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const inputClass = 'w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950/45 dark:text-slate-100 dark:placeholder-slate-500';

export const AuthInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
    <input {...props} className={`${inputClass} ${Icon ? 'pl-9' : ''} ${props.className || ''}`} />
  </div>
);

export const AuthSelect = ({ children, ...props }) => (
  <select {...props} className={`${inputClass} ${props.className || ''}`}>
    {children}
  </select>
);

export const PasswordInput = ({ showPassword, onToggle, ...props }) => (
  <div className="relative">
    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input {...props} type={showPassword ? 'text' : 'password'} className={`${inputClass} pl-9 pr-10 ${props.className || ''}`} />
    <button
      type="button"
      onClick={onToggle}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      className="absolute right-0 top-0 flex h-full items-center px-3 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  </div>
);

export const AuthField = ({ label, children }) => (
  <label className="block space-y-1.5">
    <span className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">{label}</span>
    {children}
  </label>
);

export const RoleAuthLayout = ({
  accent,
  accentSoft,
  role,
  title,
  description,
  icon: Icon,
  children,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`auth-page auth-page-${role} min-h-screen overflow-hidden font-sans text-slate-900 transition-colors duration-200 dark:text-slate-100`}>
      <div className="auth-grid" />
      <div className="auth-wave auth-wave-one" />
      <div className="auth-wave auth-wave-two" />
      <div className="auth-landmark" aria-hidden="true">
        <div className="auth-building auth-building-tall" />
        <div className="auth-building auth-building-wide" />
        <div className="auth-building auth-building-small" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-7">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 group-hover:scale-105 transition-transform">
              C2C
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
              Campus2Career
            </span>
          </Link>
        </div>
        <div className="fixed right-5 top-5 z-20 flex items-center gap-2">
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800">
            {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
        <div className="mt-1 text-center text-[9px] font-medium tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Learn <span className="mx-1">·</span> Build <span className="mx-1">·</span> Grow <span className="mx-1">·</span> Succeed
        </div>

        <section className="my-auto flex justify-center py-8">
          <div className="auth-card w-full max-w-[370px] rounded-2xl border p-5 sm:p-6">
            <div className="mb-5 text-center">
              <div className={`auth-icon mx-auto flex h-12 w-12 items-center justify-center rounded-full ${accentSoft}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h1 className="mt-3 text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">{title}</h1>
              <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">Welcome back! Please login to continue</p>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export const AuthError = ({ message }) => message ? (
  <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400">{message}</div>
) : null;

export const ChangeAccountType = ({ role, className = '' }) => {
  const roleColorClass = role === 'college'
    ? 'text-blue-600 hover:underline dark:text-blue-400'
    : role === 'company' || role === 'industry'
    ? 'text-emerald-600 hover:underline dark:text-emerald-400'
    : 'text-purple-600 hover:underline dark:text-purple-400';

  return (
    <Link to="/" className={`mt-5 flex items-center justify-center gap-1 text-[10px] font-semibold ${className || roleColorClass}`}>
      <ArrowLeft className="h-3 w-3" /> Change account type
    </Link>
  );
};

export { Mail };
