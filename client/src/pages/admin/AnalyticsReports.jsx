import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/roleServices';
import {
  TrendingUp,
  Award,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Printer,
  Download,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsReports = () => {
  const [reports, setReports] = useState({
    growthMetrics: [
      { month: 'Jan', students: 8200, companies: 540, colleges: 180, placements: 320 },
      { month: 'Feb', students: 9100, companies: 610, colleges: 200, placements: 450 },
      { month: 'Mar', students: 10200, companies: 690, colleges: 220, placements: 590 },
      { month: 'Apr', students: 11100, companies: 750, colleges: 235, placements: 780 },
      { month: 'May', students: 11900, companies: 805, colleges: 248, placements: 920 },
      { month: 'Jun', students: 12568, companies: 842, colleges: 256, placements: 1245 },
    ],
    demandShare: [
      { name: 'Frontend Web', value: 35, color: '#3B82F6' },
      { name: 'Backend & Cloud', value: 28, color: '#10B981' },
      { name: 'AI & Data Science', value: 22, color: '#8B5CF6' },
      { name: 'UI/UX & Product', value: 15, color: '#F97316' },
    ],
    totalRevenue: '₹4.2M Platform Volume',
    activeHiringDrives: 48,
    verifiedSkillPassports: 10420,
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await adminService.getAnalyticsReports();
      if (res.success && res.reports) {
        setReports(res.reports);
      }
    } catch (err) {
      console.warn('Fallback reports');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            Executive Ecosystem Analytics & Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Platform-wide growth KPIs, student employment metrics, and recruiter engagement telemetry.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          Export Executive Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Verified Skill Passports</span>
          <h3 className="text-2xl font-bold text-orange-500 mt-1">
            {reports.verifiedSkillPassports || 10420}
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">83% of total student base</span>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Active Hiring Drives</span>
          <h3 className="text-2xl font-bold text-emerald-500 mt-1">
            {reports.activeHiringDrives || 48}
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Tier-1 enterprise employers</span>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Total Ecosystem Placements</span>
          <h3 className="text-2xl font-bold text-blue-500 mt-1">
            1,245
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">₹14.2 LPA Mean CTC</span>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Platform Health Score</span>
          <h3 className="text-2xl font-bold text-purple-500 mt-1">
            99.8% Uptime
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zero latency degradation</span>
        </div>
      </div>

      {/* Main Growth Multi-Bar Chart */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
          Multi-Stakeholder Monthly Onboarding Growth (Jan - Jun)
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reports.growthMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="students" fill="#F97316" radius={[4, 4, 0, 0]} name="Students" />
              <Bar dataKey="companies" fill="#10B981" radius={[4, 4, 0, 0]} name="Companies" />
              <Bar dataKey="colleges" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Colleges" />
              <Bar dataKey="placements" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Placements" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Demand Distribution Pie Chart */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
          Ecosystem Skill Demand Share
        </h3>
        <div className="w-full h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reports.demandShare}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {reports.demandShare.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111C38',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
          {reports.demandShare.map((d, idx) => (
            <div key={idx} className="flex items-center gap-1.5 justify-center">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {d.name}: {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
