import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collegeService } from '../../services/roleServices';
import { StatCard } from '../../components/common/StatCard';
import {
  Users,
  BookOpen,
  Briefcase,
  Award,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

export const CollegeDashboard = () => {
  const [data, setData] = useState({
    welcomeMessage: 'Welcome, Dr. Mehta! 🎓',
    subtitle: 'Monitor students and improve outcomes.',
    stats: {
      totalStudents: { count: '1,245', numeric: 1245, label: 'Total Students' },
      activePrograms: { count: '32', numeric: 32, label: 'Active Programs' },
      internships: { count: '85', numeric: 85, label: 'Internships' },
      placements: { count: '62', numeric: 62, label: 'Placements' },
    },
    skillAnalytics: [
      { skill: 'AI/ML', count: 380, averageScore: 78 },
      { skill: 'Web Dev', count: 1120, averageScore: 89 },
      { skill: 'DSA', count: 850, averageScore: 82 },
      { skill: 'DBMS', count: 940, averageScore: 85 },
      { skill: 'Cloud', count: 520, averageScore: 74 },
    ],
    recentUpdates: [
      { id: '1', title: 'New Training Program added', time: '2h ago', category: 'training' },
      { id: '2', title: 'Internship Drive - TechCorp', time: '1d ago', category: 'internship' },
      { id: '3', title: 'Placement Drive - TCS', time: '2d ago', category: 'placement' },
    ],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await collegeService.getDashboard();
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.warn('Fallback college dashboard');
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {data.welcomeMessage}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {data.subtitle}
        </p>
      </div>

      {/* 4 Stat Cards Grid (Exact Layout from Reference Image) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Students"
          value={data.stats.totalStudents.count}
          subtitle={data.stats.totalStudents.label}
          role="college"
        />
        <StatCard
          title="Active Programs"
          value={data.stats.activePrograms.count}
          subtitle={data.stats.activePrograms.label}
          role="college"
        />
        <StatCard
          title="Internships"
          value={data.stats.internships.count}
          subtitle={data.stats.internships.label}
          role="college"
        />
        <StatCard
          title="Placements"
          value={data.stats.placements.count}
          subtitle={data.stats.placements.label}
          role="college"
        />
      </div>

      {/* Middle Grid: Skill Analytics Overview (Recharts Purple Line/Bar) + Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Skill Analytics Overview */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                Skill Analytics Overview
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Student competency distributions across primary curriculum tracks
              </p>
            </div>
            <Link
              to="/college/analytics"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Detailed Reports
            </Link>
          </div>

          {/* Recharts Area / Bar Chart */}
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.skillAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="skill" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111C38',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#blueGradient)"
                  dot={{ r: 4, fill: '#2563EB' }}
                  activeDot={{ r: 6, fill: '#60A5FA' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                Recent Updates
              </h3>
              <Link
                to="/college/training-programs"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60">
              {data.recentUpdates.map((update, idx) => (
                <div key={update.id || idx} className="pt-3.5 first:pt-0 flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {update.category === 'training' ? (
                      <BookOpen className="w-4 h-4" />
                    ) : update.category === 'internship' ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <Award className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">
                      {update.title}
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      {update.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <Link
              to="/college/skill-gap"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              Analyze Industry Skill Gap <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
