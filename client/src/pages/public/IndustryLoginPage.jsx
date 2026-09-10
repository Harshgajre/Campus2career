import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  AuthError,
  AuthField,
  AuthInput,
  ChangeAccountType,
  PasswordInput,
  RoleAuthLayout,
} from '../../components/auth/RoleAuthLayout';

export const IndustryLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate('/company/dashboard');
    } else setError(res.message || 'Invalid email or password');
  };

  return (
    <RoleAuthLayout
      accent="bg-emerald-600"
      accentSoft="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"
      role="industry"
      title="Industry Login"
      description="Discover talent, collaborate and create opportunities."
      icon={Building2}
    >
      <AuthError message={error} />
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <AuthField label="Email Address">
          <AuthInput icon={Mail} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required />
        </AuthField>
        <AuthField label="Password">
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} required />
        </AuthField>
        <div className="flex items-center justify-between pt-1 text-[10px]">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
            Remember me
          </label>
          <a href="#forgot" onClick={(event) => event.preventDefault()} className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-700 disabled:opacity-50">
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center text-[10px] text-slate-500 dark:text-slate-400">
        New here?{' '}
        <a href="/register/company" className="font-bold text-emerald-600 hover:underline dark:text-emerald-400">Register Company</a>
      </div>
      <ChangeAccountType role="industry" />
    </RoleAuthLayout>
  );
};
