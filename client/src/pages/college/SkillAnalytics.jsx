import React, { useState, useEffect } from 'react';
import { collegeService } from '../../services/roleServices';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Layers,
  Award,
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
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

export const SkillAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    departmentDistribution: [
      { name: 'Computer Science', students: 540, topSkill: 'Full Stack Web' },
      { name: 'Information Technology', students: 360, topSkill: 'Cloud & DevOps' },
      { name: 'AI & Data Science', students: 210, topSkill: 'Machine Learning' },
      { name: 'Electronics & Comm.', students: 135, topSkill: 'Embedded & IoT' },
    ],
    proficiencyDistribution: [
      { name: 'Expert', value: 185, color: '#10B981' },
      { name: 'Advanced', value: 480, color: '#3B82F6' },
      { name: 'Intermediate', value: 420, color: '#8B5CF6' },
      { name: 'Beginner', value: 160, color: '#F97316' },
    ],
    trendGrowth: [
      { month: 'Jan', WebDev: 800, AIML: 210, Cloud: 340, DSA: 620 },
      { month: 'Feb', WebDev: 890, AIML: 260, Cloud: 380, DSA: 690 },
      { month: 'Mar', WebDev: 940, AIML: 300, Cloud: 420, DSA: 740 },
      { month: 'Apr', WebDev: 1010, AIML: 330, Cloud: 460, DSA: 790 },
      { month: 'May', WebDev: 1080, AIML: 360, Cloud: 490, DSA: 820 },
      { month: 'Jun', WebDev: 1120, AIML: 380, Cloud: 520, DSA: 850 },
    ],
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await collegeService.getSkillAnalytics();
      if (res.success && res.analytics) {
        setAnalytics(res.analytics);
      }
    } catch (err) {
      console.warn('Fallback analytics');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-500" />
          Campus Skill Analytics & Telemetry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Deep-dive telemetry into departmental skill strengths, cohort growth over time, and competency benchmarks.
        </p>
      </div>

      {/* Top Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Distribution */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
            Department-Wise Student Capacity
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.departmentDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10 }} />
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
                <Bar dataKey="students" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proficiency Level Breakdown */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
            Skill Proficiency Distribution
          </h3>
          <div className="w-full h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={analytics.proficiencyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics.proficiencyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#8B5CF6'} />
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
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800/80">
            {analytics.proficiencyDistribution.map((p, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-slate-600 dark:text-slate-300">{p.name}: {p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Growth Trends Multi-Line Chart */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
          6-Month Skill Mastery Growth Trends (Jan - Jun)
        </h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.trendGrowth} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
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
              <Line type="monotone" dataKey="WebDev" stroke="#3B82F6" strokeWidth={2.5} />
              <Line type="monotone" dataKey="AIML" stroke="#8B5CF6" strokeWidth={2.5} />
              <Line type="monotone" dataKey="Cloud" stroke="#10B981" strokeWidth={2.5} />
              <Line type="monotone" dataKey="DSA" stroke="#F97316" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
