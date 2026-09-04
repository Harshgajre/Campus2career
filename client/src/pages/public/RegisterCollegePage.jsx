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

export const RegisterCollegePage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', institutionName: '', code: '', university: '', state: 'Maharashtra', city: 'Pune' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const update = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const res = await register('college', formData);
    setLoading(false);
    if (res.success) navigate('/college/dashboard');
    else setError(res.message || 'Registration failed');
  };

  return (
    <RoleAuthLayout
      accent="bg-emerald-500"
      accentSoft="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"
      badge="For Universities"
      title="Set up your university portal"
      description="Empower your campus with student insights and industry connections."
      icon={Building2}
      features={['Manage student cohorts', 'Track skill gaps', 'Build industry partnerships']}
      quote="Education Creates Opportunities..."
    >
      <h2 className="mb-4 text-center text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">University Registration</h2>
      <AuthError message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <AuthField label="Institution Name"><AuthInput value={formData.institutionName} onChange={update('institutionName')} placeholder="Institution name" required /></AuthField>
          <AuthField label="College AISHE / Code"><AuthInput value={formData.code} onChange={update('code')} placeholder="AIT-4110" required /></AuthField>
          <AuthField label="Authorized Official"><AuthInput icon={User} value={formData.name} onChange={update('name')} placeholder="Official name" required /></AuthField>
          <AuthField label="Official Email"><AuthInput icon={Mail} type="email" value={formData.email} onChange={update('email')} placeholder="official@university.edu" required /></AuthField>
          <AuthField label="Password"><PasswordInput value={formData.password} onChange={update('password')} placeholder="Create a password" showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} required /></AuthField>
          <AuthField label="Affiliated University"><AuthInput value={formData.university} onChange={update('university')} placeholder="University name" required /></AuthField>
          <AuthField label="State"><AuthInput value={formData.state} onChange={update('state')} placeholder="State" required /></AuthField>
          <AuthField label="City"><AuthInput value={formData.city} onChange={update('city')} placeholder="City" required /></AuthField>
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:opacity-50">{loading ? 'Creating portal...' : 'Create University Portal'}</button>
      </form>
      <div className="mt-4 text-center text-[10px] text-slate-500 dark:text-slate-400">Already registered? <Link to="/login/college" className="font-bold text-emerald-600 hover:underline dark:text-emerald-400">Sign In</Link></div>
    </RoleAuthLayout>
  );
};
