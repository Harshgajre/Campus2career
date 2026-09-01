import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { companyService } from '../../services/roleServices';
import { StatCard } from '../../components/common/StatCard';
import {
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

export const CompanyDashboard = () => {
  const [data, setData] = useState({
    welcomeMessage: 'Welcome, Riya! 💼',
    subtitle: 'Find and hire the best talent for your company.',
    stats: {
      openOpportunities: { count: '18', label: 'Open Opportunities' },
      totalCandidates: { count: '320', label: 'Total Candidates' },
      shortlisted: { count: '64', label: 'Shortlisted' },
      interviews: { count: '26', label: 'Interviews' },
    },
    applicationsOverview: [
      { month: 'Jan', applications: 210 },
      { month: 'Feb', applications: 420 },
      { month: 'Mar', applications: 380 },
      { month: 'Apr', applications: 610 },
      { month: 'May', applications: 540 },
      { month: 'Jun', applications: 850 },
    ],
    recentApplications: [
      {
        id: '1',
        name: 'Harsh Gajre',
        role: 'Frontend Developer',
        time: '2h ago',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      },
      {
        id: '2',
        name: 'Priya Singh',
        role: 'UI/UX Designer',
        time: '5h ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      },
      {
        id: '3',
        name: 'Dev Mehta',
        role: 'Backend Developer',
        time: '1d ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await companyService.getDashboard();
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.warn('Fallback company dashboard');
      }
    };
    fetchData();
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
          title="Open Opportunities"
          value={data.stats.openOpportunities.count}
          subtitle={data.stats.openOpportunities.label}
          role="company"
        />
        <StatCard
          title="Total Candidates"
          value={data.stats.totalCandidates.count}
          subtitle={data.stats.totalCandidates.label}
          role="company"
        />
        <StatCard
          title="Shortlisted"
          value={data.stats.shortlisted.count}
          subtitle={data.stats.shortlisted.label}
          role="company"
        />
        <StatCard
          title="Interviews"
          value={data.stats.interviews.count}
          subtitle={data.stats.interviews.label}
          role="company"
        />
      </div>

      {/* Middle Grid: Applications Overview (Emerald Spline Line) + Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Applications Overview */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                Applications Overview
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Monthly candidate application inflow across posted roles
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
              +42% MoM Inflow
            </span>
          </div>

          {/* Recharts Emerald Area/Line Chart */}
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.applicationsOverview} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} />
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
                  dataKey="applications"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#emeraldGradient)"
                  dot={{ r: 4, fill: '#10B981' }}
                  activeDot={{ r: 6, fill: '#34D399' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications (Harsh, Priya, Dev with avatars & roles) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                Recent Applications
              </h3>
              <Link
                to="/company/candidates"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60">
              {data.recentApplications.map((cand) => (
                <div key={cand.id} className="pt-3.5 first:pt-0 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
                        {cand.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {cand.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                    {cand.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <Link
              to="/company/shortlisted"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              Review Shortlisted Candidates <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
