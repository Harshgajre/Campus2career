import React, { useEffect, useState } from 'react';
import { studentService } from '../../services/roleServices';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Building,
  Loader2,
  Code2,
  Award,
} from 'lucide-react';

export const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await studentService.getPassport();
      if (res.success && res.passport) {
        setProfileData(res.passport);
      } else {
        setError('Could not load profile data.');
      }
    } catch (err) {
      setError('Unable to load your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs text-slate-500 dark:text-slate-400">Loading your profile...</p>
      </div>
    );
  }

  // Real data from DB — passport API returns fresh MongoDB values
  const studentName = profileData?.studentName || '—';
  const email = profileData?.email || '—';
  const phone = profileData?.phone || '—';
  // rollNumber is stored on Student model and returned directly
  const rollNumber = profileData?.rollNumber || '—';
  const collegeName = profileData?.collegeName || '—';
  const department = profileData?.department || '—';
  const skills = profileData?.skills || [];
  const certifications = profileData?.certifications || [];

  // Check if avatar is real custom image (exclude dicebear URLs)
  const isCustomAvatar = profileData?.avatar && !profileData.avatar.includes('dicebear.com');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-blue-500" />
          My Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Your student profile and registration details.
        </p>
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-4 rounded-xl text-xs font-medium border border-red-200 dark:border-red-900">
          {error}
        </div>
      ) : null}

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {isCustomAvatar ? (
              <img
                src={profileData.avatar}
                alt={studentName}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-black flex-shrink-0 ring-4 ring-white/20">
                {studentName !== '—' ? studentName[0].toUpperCase() : 'S'}
              </div>
            )}

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight">
                {studentName}
              </h2>
              <p className="text-xs font-medium text-blue-100 flex items-center justify-center sm:justify-start gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{department}</span>
              </p>
              <p className="text-xs text-blue-200 flex items-center justify-center sm:justify-start gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>{collegeName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Information Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Registration & Academic Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  Email Address
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {email}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  Phone Number
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {phone}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                  Roll Number
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {rollNumber}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
                  <Building className="w-3.5 h-3.5 text-amber-500" />
                  Institution
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {collegeName}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Technical Skills
            </h3>
            {skills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {sk.name}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {sk.category || 'Skill'} • {sk.level || 'Intermediate'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                —
              </div>
            )}
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Certifications
            </h3>
            {certifications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {cert.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer || '—'}</p>
                    </div>
                    {cert.date && (
                      <span className="text-[10px] text-slate-400 mt-2">{cert.date}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                —
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
