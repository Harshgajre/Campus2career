import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  AuthError,
  AuthField,
  AuthInput,
  AuthSelect,
  PasswordInput,
  RoleAuthLayout,
} from '../../components/auth/RoleAuthLayout';

export const RegisterCompanyPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', companyName: '', industryType: 'Information Technology & Software', location: 'Bangalore, India', website: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const update = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const res = await register('company', formData);
    setLoading(false);
    if (res.success) navigate('/company/dashboard');
    else setError(res.message || 'Registration failed');
  };

  return (
    <RoleAuthLayout
      accent="bg-emerald-600"
      accentSoft="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"
      badge="For Industry"
      title="Create your industry account"
      description="Connect with skilled talent and build stronger teams."
      icon={Building2}
      features={['Find verified talent', 'Post opportunities', 'Collaborate with institutions']}
      quote="Talent Builds Tomorrow!"
    >
      <h2 className="mb-4 text-center text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">Industry Registration</h2>
      <AuthError message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <AuthField label="Company Name"><AuthInput value={formData.companyName} onChange={update('companyName')} placeholder="Company name" required /></AuthField>
          <AuthField label="Recruiter / HR Name"><AuthInput icon={User} value={formData.name} onChange={update('name')} placeholder="Full name" required /></AuthField>
          <AuthField label="Corporate Email"><AuthInput icon={Mail} type="email" value={formData.email} onChange={update('email')} placeholder="name@company.com" required /></AuthField>
          <AuthField label="Password"><PasswordInput value={formData.password} onChange={update('password')} placeholder="Create a password" showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} required /></AuthField>
          <AuthField label="Industry Domain"><AuthSelect value={formData.industryType} onChange={update('industryType')}><option>Information Technology & Software</option><option>Fintech & Banking</option><option>AI & Machine Learning</option><option>Healthcare & Biotech</option><option>E-commerce & Retail</option></AuthSelect></AuthField>
          <AuthField label="Headquarters Location"><AuthInput value={formData.location} onChange={update('location')} placeholder="Bangalore, India" required /></AuthField>
        </div>
        <AuthField label="Company Website"><AuthInput type="url" value={formData.website} onChange={update('website')} placeholder="https://company.example.com" /></AuthField>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-700 disabled:opacity-50">{loading ? 'Creating account...' : 'Create Industry Account'}</button>
      </form>
      <div className="mt-4 text-center text-[10px] text-slate-500 dark:text-slate-400">Already registered? <Link to="/login/industry" className="font-bold text-emerald-600 hover:underline dark:text-emerald-400">Sign In</Link></div>
    </RoleAuthLayout>
  );
};
