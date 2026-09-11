import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Award, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  AuthError,
  AuthField,
  AuthInput,
  ChangeAccountType,
  PasswordInput,
  RoleAuthLayout,
} from '../../components/auth/RoleAuthLayout';

const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DIGILOCKER_INITIATE_URL = API_BASE + '/auth/digilocker';

export const StudentLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, loginWithToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [digiLoading, setDigiLoading] = useState(false);

  // Handle DigiLocker callback (token or error in URL)
  useEffect(() => {
    const token = searchParams.get('digilocker_token');
    const dlError = searchParams.get('digilocker_error');

    if (token) {
      // Clean URL params immediately
      setSearchParams({}, { replace: true });
      setDigiLoading(true);
      setError('');
      (async () => {
        const res = await loginWithToken(token);
        setDigiLoading(false);
        if (res.success && res.role === 'student') {
          navigate('/student/dashboard');
        } else {
          setError(res.message || 'DigiLocker login failed');
        }
      })();
    } else if (dlError) {
      setSearchParams({}, { replace: true });
      setError(decodeURIComponent(dlError));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password, 'student');
    setLoading(false);
    if (res.success && res.role === 'student') {
      navigate('/student/dashboard');
    } else {
      setError(res.message || 'Invalid student credentials');
    }
  };

  const handleDigiLockerConnect = () => {
    // Redirect to backend which initiates DigiLocker OAuth
    window.location.href = DIGILOCKER_INITIATE_URL;
  };

  return (
    <RoleAuthLayout
      accent="bg-purple-600"
      accentSoft="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300"
      role="student"
      title="Student Login"
      description="Continue your learning journey toward a brighter future."
      icon={Award}
    >
      <AuthError message={error} />

      {/* DigiLocker Connect Button */}
      <button
        type="button"
        onClick={handleDigiLockerConnect}
        disabled={digiLoading || loading}
        className="group relative mb-2 flex w-full items-center justify-center gap-2.5 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 text-xs font-bold text-blue-700 shadow-sm transition-all hover:border-blue-300 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md disabled:opacity-50 dark:border-blue-800 dark:from-blue-950/40 dark:to-indigo-950/40 dark:text-blue-300 dark:hover:border-blue-700 dark:hover:from-blue-950/60 dark:hover:to-indigo-950/60"
      >
        <ShieldCheck className="h-4 w-4 text-blue-600 transition-transform group-hover:scale-110 dark:text-blue-400" />
        {digiLoading ? 'Connecting...' : 'Connect with DigiLocker'}
        <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
        </span>
      </button>
      <p className="mb-2 text-center text-[8px] text-slate-400 dark:text-slate-500">
        Securely verify your identity via DigiLocker (Aadhaar-based)
      </p>

      {/* OR Divider */}
      <div className="relative my-3 flex items-center">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
        <span className="mx-3 shrink-0 text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          or
        </span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
      </div>

      {/* Existing Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <AuthField label="Email Address">
          <AuthInput icon={Mail} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required />
        </AuthField>
        <AuthField label="Password">
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} required />
        </AuthField>
        <div className="flex items-center justify-between pt-1 text-[10px]">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-3.5 w-3.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
            Remember me
          </label>
          <a href="#forgot" onClick={(event) => event.preventDefault()} className="font-semibold text-purple-600 hover:underline dark:text-purple-400">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading || digiLoading} className="w-full rounded-lg bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 transition hover:bg-purple-700 disabled:opacity-50">
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center text-[10px] text-slate-500 dark:text-slate-400">
        New here?{' '}
        <a href="/register/student" className="font-bold text-purple-600 hover:underline dark:text-purple-400">Register as Student</a>
      </div>
      <ChangeAccountType role="student" />
    </RoleAuthLayout>
  );
};
