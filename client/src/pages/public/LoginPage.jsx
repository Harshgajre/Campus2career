import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, Award, GraduationCap, Building2, ShieldAlert } from 'lucide-react';
import campusCareerBridge from '../../assets/campus-career-bridge.svg';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(`/${res.role}/dashboard`);
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  const handleQuickDemo = async (role) => {
    setError('');
    setLoading(true);
    const res = await demoLogin(role);
    setLoading(false);
    if (res.success) {
      navigate(`/${res.role}/dashboard`);
    }
  };

  return (
    <div className="relative min-h-[85vh] overflow-hidden flex items-center justify-center px-4 py-12 sm:p-6 bg-[#f7f6ff] dark:bg-[#030622]">
      <div className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-80">
        <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[760px] h-[430px] rounded-[50%] border border-indigo-200/70 dark:border-blue-500/20" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1040px] h-[560px] rounded-[50%] border border-indigo-200/50 dark:border-cyan-400/10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-300/20 dark:bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[680px] h-40 bg-cyan-400/10 dark:bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <img
          src={campusCareerBridge}
          alt="Campus Career bridge"
          className="w-full h-auto mb-5 object-contain drop-shadow-[0_8px_18px_rgba(37,99,235,0.2)] dark:drop-shadow-[0_8px_24px_rgba(6,182,212,0.35)]"
        />

      <div className="w-full bg-white/90 dark:bg-[#07102d]/90 border border-indigo-100 dark:border-blue-500/40 rounded-2xl shadow-[0_18px_55px_rgba(79,70,229,0.14)] dark:shadow-[0_18px_55px_rgba(0,0,0,0.48)] backdrop-blur-sm p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 text-white font-bold mb-3 shadow-md shadow-blue-500/30">
            <LogIn className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to access your Campus2Career portal
          </p>
        </div>

        {/* Demo 1-Click Login Quick Switcher */}
        <div className="mb-6 p-3 rounded-xl bg-indigo-50/70 dark:bg-[#0b1740]/80 border border-indigo-100 dark:border-blue-500/20">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block text-center mb-2 uppercase tracking-wider">
            ⚡ Quick Demo 1-Click Sign-In
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="py-2 px-2 text-[11px] font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1.5 transition-all"
            >
              <Award className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('college')}
              className="py-2 px-2 text-[11px] font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center gap-1.5 transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              College
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('company')}
              className="py-2 px-2 text-[11px] font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1.5 transition-all"
            >
              <Building2 className="w-3.5 h-3.5" />
              Company
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-2 text-[11px] font-semibold rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/60 border border-orange-200 dark:border-orange-800 flex items-center justify-center gap-1.5 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Register Links */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <span>New to Campus2Career? Register as:</span>
          <div className="mt-2 flex items-center justify-center gap-3 font-semibold text-blue-600 dark:text-blue-400 text-[11px]">
            <Link to="/register/student" className="hover:underline">Student</Link>
            <span>•</span>
            <Link to="/register/college" className="hover:underline">College</Link>
            <span>•</span>
            <Link to="/register/company" className="hover:underline">Company</Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
