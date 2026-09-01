import React, { useState, useEffect } from 'react';
import { collegeService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import {
  GitCompare,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SkillGap = () => {
  const [gaps, setGaps] = useState([
    {
      skill: 'Docker & Kubernetes (Cloud Native)',
      industryDemand: 92,
      studentProficiency: 44,
      gapPercentage: 48,
      priority: 'Critical',
      recommendedProgram: 'Hands-on Cloud DevOps Bootcamp',
    },
    {
      skill: 'Next.js & Server Side Rendering',
      industryDemand: 88,
      studentProficiency: 52,
      gapPercentage: 36,
      priority: 'High',
      recommendedProgram: 'Production Full-Stack Next.js 14 Workshop',
    },
    {
      skill: 'System Design & High-Scalability',
      industryDemand: 85,
      studentProficiency: 55,
      gapPercentage: 30,
      priority: 'High',
      recommendedProgram: 'Architecting Distributed Systems Masterclass',
    },
    {
      skill: 'Generative AI & LLM Prompt Pipelines',
      industryDemand: 79,
      studentProficiency: 41,
      gapPercentage: 38,
      priority: 'High',
      recommendedProgram: 'AI-Powered Application Engineering',
    },
    {
      skill: 'TypeScript in Modern JavaScript',
      industryDemand: 90,
      studentProficiency: 68,
      gapPercentage: 22,
      priority: 'Medium',
      recommendedProgram: 'Strict Mode Enterprise TypeScript Course',
    },
  ]);

  useEffect(() => {
    loadGaps();
  }, []);

  const loadGaps = async () => {
    try {
      const res = await collegeService.getSkillGap();
      if (res.success && res.gaps) {
        setGaps(res.gaps);
      }
    } catch (err) {
      console.warn('Fallback skill gap');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-purple-500" />
          Automated Skill Gap Analysis Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time divergence mapping between active recruiter job requirements and on-campus student competencies.
        </p>
      </div>

      {/* Priority Gap Summary Alert Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              Top Priority Gap: Cloud DevOps & Containerization
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              48% divergence identified against Q3 2026 hiring benchmarks across Bangalore tech firms.
            </p>
          </div>
        </div>

        <Link
          to="/college/training-programs"
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Schedule Training Program
        </Link>
      </div>

      {/* Gap Table Matrix */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            Competency Benchmark Matrix
          </h3>
          <span className="text-[11px] text-slate-400">
            Updated based on 800+ recruiter job postings
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {gaps.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {item.skill}
                  </span>
                  <Badge
                    variant={item.priority === 'Critical' ? 'rose' : item.priority === 'High' ? 'amber' : 'purple'}
                    size="xs"
                  >
                    {item.priority} Priority
                  </Badge>
                </div>

                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  {item.gapPercentage}% Skill Gap
                </span>
              </div>

              {/* Progress Bars comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Industry Demand</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.industryDemand}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${item.industryDemand}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Campus Student Proficiency</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.studentProficiency}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${item.studentProficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Remediation recommendation */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended Action: {item.recommendedProgram}
                </span>
                <Link
                  to="/college/training-programs"
                  className="font-semibold text-purple-600 hover:underline flex items-center gap-1"
                >
                  Create Program <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
