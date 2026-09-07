import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  AuthError,
  AuthField,
  AuthInput,
  AuthSelect,
  PasswordInput,
  RoleAuthLayout,
} from '../../components/auth/RoleAuthLayout';

export const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', rollNumber: '', department: 'Computer Science', semester: 6, collegeName: '', bio: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const update = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const res = await register('student', formData);
    setLoading(false);
    if (res.success) navigate('/student/dashboard');
    else setError(res.message || 'Registration failed');
  };

  return (
    <RoleAuthLayout
      accent="bg-purple-600"
      accentSoft="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300"
      badge="For Students"
      title="Create your student account"
      description="Build your skill passport and unlock verified career opportunities."
      icon={Award}
      features={['Create your skill passport', 'Track your learning journey', 'Connect with opportunities']}
      quote="Your Future Starts Here!"
    >
      <h2 className="mb-4 text-center text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">Student Registration</h2>
      <AuthError message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <AuthField label="Full Name"><AuthInput icon={User} value={formData.name} onChange={update('name')} placeholder="Full name" required /></AuthField>
          <AuthField label="Email Address"><AuthInput icon={Mail} type="email" value={formData.email} onChange={update('email')} placeholder="name@example.com" required /></AuthField>
          <AuthField label="Password"><PasswordInput value={formData.password} onChange={update('password')} placeholder="Create a password" showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} required /></AuthField>
          <AuthField label="Roll Number"><AuthInput value={formData.rollNumber} onChange={update('rollNumber')} placeholder="STU-2024-001" required /></AuthField>
          <AuthField label="College / University"><AuthInput value={formData.collegeName} onChange={update('collegeName')} placeholder="Institution name" required /></AuthField>
          <AuthField label="Department"><AuthSelect value={formData.department} onChange={update('department')}><option>Computer Science</option><option>Information Technology</option><option>AI & Data Science</option><option>Electronics</option><option>Mechanical</option></AuthSelect></AuthField>
        </div>
        <AuthField label="Short Bio"><textarea rows="2" value={formData.bio} onChange={update('bio')} placeholder="Tell us about your interests" className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/15 dark:border-slate-700 dark:bg-slate-950/45 dark:text-slate-100 dark:placeholder-slate-500" /></AuthField>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 transition hover:bg-purple-700 disabled:opacity-50">{loading ? 'Creating account...' : 'Create Student Account'}</button>
      </form>
      <div className="mt-4 text-center text-[10px] text-slate-500 dark:text-slate-400">Already registered? <Link to="/login/student" className="font-bold text-purple-600 hover:underline dark:text-purple-400">Sign In</Link></div>
    </RoleAuthLayout>
  );
};
