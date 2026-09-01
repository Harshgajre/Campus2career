import React, { useEffect, useState } from 'react';
import { studentService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import {
  Award,
  ShieldCheck,
  QrCode,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  Star,
  Sparkles,
  ExternalLink,
  Code,
  Layers,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export const SkillPassport = () => {
  const [passport, setPassport] = useState({
    passportId: 'C2C-PASSPORT-2026-HG01',
    studentName: 'Harsh Gajre',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    collegeName: 'MIT Institute of Technology',
    department: 'Computer Science',
    semester: 6,
    cgpa: 8.9,
    overallProgress: 75,
    employabilityScore: 88,
    verifiedSkillsCount: 10,
    totalCompetencies: 12,
    issuedDate: '2026-01-15',
    verificationHash: '0x8f2a93b4e10c7654321fedcba9876543210',
    topSkills: [
      { name: 'JavaScript & React', score: 94, level: 'Expert', verified: true },
      { name: 'Node.js & Express', score: 86, level: 'Advanced', verified: true },
      { name: 'Data Structures & Algorithms', score: 88, level: 'Advanced', verified: true },
      { name: 'Tailwind CSS & UI Systems', score: 92, level: 'Expert', verified: true },
      { name: 'MongoDB & Database Design', score: 82, level: 'Advanced', verified: true },
    ],
    radarMetrics: [
      { subject: 'Coding & DSA', A: 90, fullMark: 100 },
      { subject: 'System Design', A: 78, fullMark: 100 },
      { subject: 'Frontend', A: 95, fullMark: 100 },
      { subject: 'Backend', A: 85, fullMark: 100 },
      { subject: 'DevOps & Git', A: 80, fullMark: 100 },
      { subject: 'Problem Solving', A: 92, fullMark: 100 },
    ],
    certifications: [
      { title: 'Meta Certified Full Stack Developer', issuer: 'Meta', date: '2026-03-10', badge: 'Certified' },
      { title: 'AWS Cloud Practitioner Foundational', issuer: 'Amazon Web Services', date: '2025-11-20', badge: 'Verified' },
      { title: 'SIH Finalist Hackathon Badge', issuer: 'Ministry of Education', date: '2025-12-18', badge: 'Top 1%' },
    ],
  });

  useEffect(() => {
    loadPassport();
  }, []);

  const loadPassport = async () => {
    try {
      const res = await studentService.getPassport();
      if (res.success && res.passport) {
        setPassport(res.passport);
      }
    } catch (err) {
      console.warn('Using default passport');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Controls (Hidden during print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-500" />
            Digital Skill Passport
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your tamper-proof, verifiable digital career credential recognized by universities and partner enterprises.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Passport
          </button>
        </div>
      </div>

      {/* Main Passport Document Card */}
      <div className="bg-white dark:bg-[#111C38] border-2 border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-xl overflow-hidden print:border-none print:shadow-none">
        {/* Passport Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-xl tracking-wider">
              C2C
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200 block">
                Official Digital Credential
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Campus2Career Skill Passport
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right bg-black/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/15">
            <span className="text-[10px] text-blue-200 block">Passport ID</span>
            <span className="text-xs font-mono font-bold tracking-wider">
              {passport.passportId}
            </span>
          </div>
        </div>

        {/* Passport Body Grid */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Profile Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Student Info */}
            <div className="md:col-span-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <img
                src={passport.avatar}
                alt={passport.studentName}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                    {passport.studentName}
                  </h3>
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {passport.department} • Semester {passport.semester} (CGPA: {passport.cgpa})
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {passport.collegeName}
                </p>
                <p className="text-[11px] text-slate-400 font-mono pt-1">
                  Issued: {passport.issuedDate} • Hash: {passport.verificationHash.slice(0, 16)}...
                </p>
              </div>
            </div>

            {/* QR Code Verification Box */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 text-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://campus2career.io/verify/${passport.passportId}`}
                alt="QR Code"
                className="w-20 h-20 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 bg-white p-1"
              />
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mt-2 uppercase tracking-wider">
                Scan to Verify Online
              </span>
              <span className="text-[9px] text-slate-400">SIH Cryptographic Seal</span>
            </div>
          </div>

          {/* Scores Overview Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Employability Score</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                {passport.employabilityScore}%
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Overall Progress</span>
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-0.5">
                {passport.overallProgress}%
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Verified Skills</span>
              <p className="text-2xl font-black text-emerald-500 mt-0.5">
                {passport.verifiedSkillsCount} / {passport.totalCompetencies}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">SIH Benchmark</span>
              <p className="text-2xl font-black text-amber-500 mt-0.5">
                Top 5%
              </p>
            </div>
          </div>

          {/* Competency Breakdown & Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Top Skills List */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Core Verified Competencies
              </h4>
              {passport.topSkills.map((sk, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#131F3B] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {sk.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Level: {sk.level}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200/60 dark:border-blue-800/60">
                    {sk.score} / 100
                  </span>
                </div>
              ))}
            </div>

            {/* Recharts Radar Matrix */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/70 dark:border-slate-800">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Multi-Dimensional Skill Radar
              </h4>
              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={passport.radarMetrics}>
                    <PolarGrid stroke="#334155" opacity={0.3} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 8 }} />
                    <Radar
                      name="Harsh Gajre"
                      dataKey="A"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Certifications and Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Certifications & Industry Achievements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {passport.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                      {cert.badge}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                      {cert.title}
                    </h5>
                    <p className="text-[11px] text-slate-400">{cert.issuer}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
