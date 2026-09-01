import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ExternalLink,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react';

export const LearningRoadmap = () => {
  const [roadmap, setRoadmap] = useState({
    careerTrack: 'Full Stack Cloud Architect',
    overallCompletion: 68,
    recommendedSkills: ['Next.js 14 Server Actions', 'Docker & Kubernetes', 'GraphQL APIs', 'Redis Caching'],
    modules: [
      {
        id: 'mod-1',
        title: 'Phase 1: Advanced Frontend & State Architecture',
        status: 'completed',
        progress: 100,
        milestones: [
          { name: 'React 18 Hooks, Custom Hooks & Optimization', done: true },
          { name: 'Tailwind CSS Custom Design Systems', done: true },
          { name: 'State Management with Context & Zustand', done: true },
          { name: 'Client-side Routing & Protected Guards', done: true },
        ],
      },
      {
        id: 'mod-2',
        title: 'Phase 2: Scalable Backend Services & APIs',
        status: 'completed',
        progress: 100,
        milestones: [
          { name: 'Node.js Event Loop & Stream Architecture', done: true },
          { name: 'Express RESTful Endpoints with JWT Authentication', done: true },
          { name: 'MongoDB Aggregations & Schema Indexing', done: true },
          { name: 'Role-based Middleware & Error Handling', done: true },
        ],
      },
      {
        id: 'mod-3',
        title: 'Phase 3: Microservices, Caching & Cloud Deployment',
        status: 'in-progress',
        progress: 55,
        milestones: [
          { name: 'Docker Containerization for Multi-container Apps', done: true },
          { name: 'Redis Cache Layer for API Response Optimization', done: true },
          { name: 'CI/CD Pipelines with GitHub Actions', done: false },
          { name: 'Kubernetes Pod Deployment & Load Balancing', done: false },
        ],
      },
      {
        id: 'mod-4',
        title: 'Phase 4: System Design & Enterprise Scale',
        status: 'upcoming',
        progress: 0,
        milestones: [
          { name: 'Distributed Systems & High Availability Architecture', done: false },
          { name: 'Kafka / RabbitMQ Event Driven Architecture', done: false },
          { name: 'Security Audits, Rate Limiting & Penetration Testing', done: false },
        ],
      },
    ],
    curatedResources: [
      { title: 'Full Stack Open 2026', provider: 'University of Helsinki', type: 'Course', url: 'https://fullstackopen.com' },
      { title: 'System Design Primer', provider: 'GitHub Open Source', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'Docker & Kubernetes Mastery', provider: 'Cloud Native Foundation', type: 'Hands-on Lab', url: 'https://kubernetes.io/docs/tutorials/' },
    ],
  });

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      const res = await studentService.getRoadmap();
      if (res.success && res.roadmap) {
        setRoadmap(res.roadmap);
      }
    } catch (err) {
      console.warn('Fallback roadmap');
    }
  };

  const toggleMilestone = (modIndex, mileIndex) => {
    const updatedModules = [...roadmap.modules];
    const target = updatedModules[modIndex].milestones[mileIndex];
    target.done = !target.done;

    const totalMilestones = updatedModules[modIndex].milestones.length;
    const completedMilestones = updatedModules[modIndex].milestones.filter((m) => m.done).length;
    updatedModules[modIndex].progress = Math.round((completedMilestones / totalMilestones) * 100);

    if (updatedModules[modIndex].progress === 100) updatedModules[modIndex].status = 'completed';
    else if (updatedModules[modIndex].progress > 0) updatedModules[modIndex].status = 'in-progress';
    else updatedModules[modIndex].status = 'upcoming';

    setRoadmap({ ...roadmap, modules: updatedModules });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Recommended Learning Path
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              {roadmap.careerTrack}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Curated based on your verified skills, market demand gaps, and target recruiter profiles.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 flex-shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-medium">Roadmap Progress</span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {roadmap.overallCompletion}%
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-600 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-slate-100">
              {roadmap.overallCompletion}%
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Skills Pills */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
          Top In-Demand Skills to Learn:
        </span>
        {roadmap.recommendedSkills.map((sk, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 font-medium whitespace-nowrap text-xs"
          >
            + {sk}
          </span>
        ))}
      </div>

      {/* Roadmap Modules Timeline */}
      <div className="space-y-4">
        {roadmap.modules.map((mod, modIdx) => (
          <div
            key={mod.id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    mod.status === 'completed'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 border border-emerald-500/30'
                      : mod.status === 'in-progress'
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-500 border border-blue-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {modIdx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {mod.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {mod.progress}% Complete
                </span>
                <Badge
                  variant={
                    mod.status === 'completed'
                      ? 'green'
                      : mod.status === 'in-progress'
                      ? 'blue'
                      : 'default'
                  }
                  size="xs"
                >
                  {mod.status === 'completed'
                    ? 'Completed'
                    : mod.status === 'in-progress'
                    ? 'In Progress'
                    : 'Upcoming'}
                </Badge>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              {mod.milestones.map((mile, mileIdx) => (
                <button
                  key={mileIdx}
                  type="button"
                  onClick={() => toggleMilestone(modIdx, mileIdx)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left text-xs transition-all ${
                    mile.done
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/40 text-slate-800 dark:text-slate-200'
                      : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {mile.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span className={mile.done ? 'line-through text-slate-400' : 'font-medium'}>
                    {mile.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Curated Resources */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          Recommended Free Industry Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {roadmap.curatedResources.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 hover:border-blue-500/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">
                  {res.type}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors mt-1">
                  {res.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{res.provider}</p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                Explore Resource <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
