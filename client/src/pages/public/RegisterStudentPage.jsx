import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Mail, User, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    rollNumber: '',
    department: 'Computer Science',
    semester: 6,
    collegeName: '',
    githubUrl: '',
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const update = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const cleanPhone = formData.phone.trim();
    if (!cleanPhone || !/^\d{10}$/.test(cleanPhone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    let registrationData = { ...formData, phone: formData.phone.trim() };
    try {
      if (resume) {
        const parsedResume = await authService.parseResume(resume);
        registrationData = {
          ...registrationData,
          resumeUrl: parsedResume.resumeUrl,
          resumeFileName: parsedResume.resumeFileName,
          extractedResumeData: parsedResume.data,
        };
      }
    } catch (uploadError) {
      setLoading(false);
      setError(uploadError.response?.data?.message || 'Resume could not be processed. Please upload a PDF or DOCX file.');
      return;
    }
    const res = await register('student', registrationData);
    setLoading(false);
    if (res.success) navigate('/login/student');
    else setError(res.message || 'Registration failed');
  };

  return (
    <RoleAuthLayout
      accent="bg-purple-600"
      accentSoft="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300"
      badge="For Students"
      title="Create your student account"
      description="Build your profile and unlock verified career opportunities."
      icon={Award}
      features={['Create your verified profile', 'Track your learning journey', 'Connect with opportunities']}
      quote="Your Future Starts Here!"
    >
      <h2 className="mb-4 text-center text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">Student Registration</h2>
      <AuthError message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <AuthField label="Full Name"><AuthInput icon={User} value={formData.name} onChange={update('name')} placeholder="Full name" required /></AuthField>
          <AuthField label="Email Address"><AuthInput icon={Mail} type="email" value={formData.email} onChange={update('email')} placeholder="name@example.com" required /></AuthField>
          <AuthField label="Phone Number"><AuthInput icon={Phone} type="tel" value={formData.phone} onChange={update('phone')} placeholder="10-digit mobile number" required /></AuthField>
          <AuthField label="Password"><PasswordInput value={formData.password} onChange={update('password')} placeholder="Create a password" showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} required /></AuthField>
          <AuthField label="Roll Number"><AuthInput value={formData.rollNumber} onChange={update('rollNumber')} placeholder="STU-2024-001" required /></AuthField>
          <AuthField label="College / University"><AuthInput value={formData.collegeName} onChange={update('collegeName')} placeholder="Institution name" required /></AuthField>
          <AuthField label="GitHub URL"><AuthInput type="url" value={formData.githubUrl} onChange={update('githubUrl')} placeholder="https://github.com/username" required /></AuthField>
          <AuthField label="Department"><AuthSelect value={formData.department} onChange={update('department')}><option>Computer Science</option><option>Information Technology</option><option>AI & Data Science</option><option>Electronics</option><option>Mechanical</option></AuthSelect></AuthField>
        </div>
        <AuthField label="Resume (PDF or DOCX)"><input type="file" accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => setResume(event.target.files?.[0] || null)} required className="w-full rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-950/45 dark:text-slate-200" /></AuthField>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 transition hover:bg-purple-700 disabled:opacity-50">{loading ? 'Creating account...' : 'Create Student Account'}</button>
      </form>
      <div className="mt-4 text-center text-[10px] text-slate-500 dark:text-slate-400">Already registered? <Link to="/login/student" className="font-bold text-purple-600 hover:underline dark:text-purple-400">Sign In</Link></div>
    </RoleAuthLayout>
  );
};
