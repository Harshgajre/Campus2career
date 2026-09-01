import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/roleServices';
import { StatCard } from '../../components/common/StatCard';
import {
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
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

export const AdminDashboard = () => {
  const [data, setData] = useState({
    welcomeMessage: 'Welcome, Super Admin! 👑',
    subtitle: 'Manage the entire platform seamlessly.',
    stats: {
      totalStudents: { count: '12,568', label: 'Total Students' },
      totalCompanies: { count: '842', label: 'Total Companies' },
      totalColleges: { count: '256', label: 'Total Colleges' },
      totalOpportunities: { count: '1,245', label: 'Opportunities' },
    },
    platformOverview: [
      { month: 'Jan', value: 800 },
      { month: 'Feb', value: 1200 },
      { month: 'Mar', value: 950 },
      { month: 'Apr', value: 1650 },
      { month: 'May', value: 1400 },
      { month: 'Jun', value: 1950 },
    ],
    recentActivities: [
      { id: '1', title: 'New company registered', time: '2h ago', type: 'company' },
      { id: '2', title: 'New opportunity posted', time: '1d ago', type: 'opportunity' },
      { id: '3', title: 'New college onboarded', time: '2d ago', type: 'college' },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adminService.getDashboard();
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.warn('Fallback admin dashboard');
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
          title="Total Students"
          value={data.stats.totalStudents.count}
          subtitle={data.stats.totalStudents.label}
          role="admin"
        />
        <StatCard
          title="Total Companies"
          value={data.stats.totalCompanies.count}
          subtitle={data.stats.totalCompanies.label}
          role="admin"
        />
        <StatCard
          title="Total Colleges"
          value={data.stats.totalColleges.count}
          subtitle={data.stats.totalColleges.label}
          role="admin"
        />
        <StatCard
          title="Opportunities"
          value={data.stats.totalOpportunities.count}
          subtitle={data.stats.totalOpportunities.label}
          role="admin"
        />
      </div>

      {/* Middle Grid: Platform Overview (Orange Spline Line Chart) + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Platform Overview Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                Platform Overview
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Aggregated monthly growth in user engagement and verified skill certifications
              </p>
            </div>
            <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/60 px-2.5 py-1 rounded-full border border-orange-200/60 dark:border-orange-800/60">
              +142% Year-to-Date
            </span>
          </div>

          {/* Recharts Radiant Orange Multi-point Spline Line Chart */}
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.platformOverview} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
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
                  dataKey="value"
                  stroke="#F97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#orangeGradient)"
                  dot={{ r: 5, fill: '#F97316' }}
                  activeDot={{ r: 7, fill: '#FB923C' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities (Orange icons & list) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                Recent Activities
              </h3>
              <Link
                to="/admin/analytics"
                className="text-xs font-semibold text-orange-500 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60">
              {data.recentActivities.map((act, idx) => (
                <div key={act.id || idx} className="pt-3.5 first:pt-0 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-500 flex items-center justify-center flex-shrink-0">
                      {act.type === 'company' ? (
                        <Building2 className="w-4 h-4" />
                      ) : act.type === 'opportunity' ? (
                        <Briefcase className="w-4 h-4" />
                      ) : (
                        <GraduationCap className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-500 transition-colors">
                      {act.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <Link
              to="/admin/companies"
              className="text-xs font-semibold text-orange-500 inline-flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              Audit Pending Company Approvals <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
