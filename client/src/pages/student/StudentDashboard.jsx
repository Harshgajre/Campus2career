import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../services/roleServices';
import { StatCard } from '../../components/common/StatCard';
import { CircularProgress } from '../../components/common/CircularProgress';
import {
  Code2,
  FolderGit2,
  Trophy,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Layers,
} from 'lucide-react';

export const StudentDashboard = () => {
  const [data, setData] = useState({
    welcomeMessage: 'Welcome back, Harsh! 👋',
    subtitle: 'Track your skills, grow and achieve your goals.',
    stats: {
      skills: { count: 12, label: 'Competencies' },
      projects: { count: 5, label: 'Completed' },
      challenges: { count: 8, label: 'Participated' },
      applications: { count: 3, label: 'Active' },
    },
    skillsProgress: {
      overallProgress: 75,
      employabilityScore: 88,
    },
    recentActivity: [
      { id: '1', title: 'Completed React Challenge', time: '2h ago', type: 'challenge' },
      { id: '2', title: 'Updated Project: Portfolio', time: '1d ago', type: 'project' },
      { id: '3', title: 'Applied for Frontend Intern', time: '2d ago', type: 'application' },
    ],
    upcomingOpportunities: [
      { id: '1', title: 'Frontend Developer Intern', company: 'TechCorp', deadline: '5d left', type: 'Internship' },
      { id: '2', title: 'UI/UX Design Challenge', company: 'DesignStudio', deadline: '1w left', type: 'Challenge' },
      { id: '3', title: 'Web Developer Intern', company: 'CodeSoft', deadline: '8d left', type: 'Internship' },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await studentService.getDashboard();
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.warn('Using default student dashboard telemetry');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Welcome Title Banner */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {data.welcomeMessage}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {data.subtitle}
        </p>
      </div>

      {/* 4 Stat Cards in Grid (Exact Layout from Reference Image) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Skills"
          value={data.stats.skills.count}
          subtitle={data.stats.skills.label}
          role="student"
        />
        <StatCard
          title="Projects"
          value={data.stats.projects.count}
          subtitle={data.stats.projects.label}
          role="student"
        />
        <StatCard
          title="Challenges"
          value={data.stats.challenges.count}
          subtitle={data.stats.challenges.label}
          role="student"
        />
        <StatCard
          title="Applications"
          value={data.stats.applications.count}
          subtitle={data.stats.applications.label}
          role="student"
        />
      </div>

      {/* Middle Section: Skills Progress (Circular Gauge) + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Card: Skills Progress */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              Skills Progress
            </h3>
          </div>

          <div className="py-4">
            <CircularProgress
              percentage={data.skillsProgress.overallProgress}
              size={150}
              strokeWidth={10}
              label="Overall Progress"
              role="student"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Employability Index</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {data.skillsProgress.employabilityScore}% Match
            </span>
          </div>
        </div>

        {/* Right Card: Recent Activity */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>
            <Link
              to="/student/applications"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60 flex-1">
            {data.recentActivity.map((activity, idx) => (
              <div
                key={activity.id || idx}
                className={`flex items-center justify-between pt-3.5 first:pt-0 group`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/40 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">
                    {activity.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-right">
            <Link
              to="/student/roadmap"
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              View My Career Roadmap <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Opportunities */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            Upcoming Opportunities
          </h3>
          <Link
            to="/student/opportunities"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {data.upcomingOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                    {opp.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {opp.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
                  {opp.deadline}
                </span>
                <Link
                  to="/student/opportunities"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
