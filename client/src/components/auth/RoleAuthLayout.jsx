import React from 'react';
import { ArrowLeft, Check, Eye, EyeOff, LockKeyhole, Mail, Moon, Sun } from 'lucide-react';
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
  badge,
  title,
  description,
  icon: Icon,
  features,
  quote,
  children,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#f4f8fc] font-sans text-slate-900 transition-colors duration-200 dark:bg-[#020e1d] dark:text-slate-100">
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-7">
      <div className="flex items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold text-white shadow-sm ${accent}`}>
            C2C
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">Campus2Career</span>
        </Link>
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800">
            {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <Link to="/" className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>
        </div>
      </div>

      <div className="mt-2 text-[9px] font-medium tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Learn <span className="mx-1">·</span> Build <span className="mx-1">·</span> Grow <span className="mx-1">·</span> Succeed
      </div>

      <div className="my-auto grid items-center gap-8 py-8 lg:grid-cols-12 lg:gap-12 lg:py-10">
        <section className="lg:col-span-7">
          <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${accentSoft}`}>{badge}</span>
          <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>

          <div className="mt-7 space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${accentSoft}`}>
                  <Check className="h-3.5 w-3.5" />
                </span>
                {feature}
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-end gap-3 text-sm font-semibold italic text-slate-700 dark:text-slate-300">
            <span className={`mb-2 block h-0.5 w-10 rotate-[-12deg] ${accent}`} />
            <span className="max-w-[170px] leading-tight">{quote}</span>
          </div>
        </section>

        <section className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-7 dark:border-slate-700 dark:bg-[#0a2034] dark:shadow-[0_18px_50px_rgba(0,0,0,0.42)]">
            <div className="mb-5 text-center">
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${accentSoft}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">Welcome Back</h2>
              <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{description}</p>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export const AuthError = ({ message }) => message ? (
  <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400">{message}</div>
) : null;

export const AuthDivider = () => (
  <div className="relative my-4">
    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
    <div className="relative flex justify-center"><span className="bg-white px-2 text-[10px] text-slate-400 dark:bg-[#0a2034]">or</span></div>
  </div>
);

export const GoogleButton = ({ onClick }) => (
  <button type="button" onClick={onClick} className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:bg-slate-900">
    <span className="text-sm font-bold text-blue-500">G</span> Continue with Google
  </button>
);

export { Mail };
