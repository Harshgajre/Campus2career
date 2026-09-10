import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import {
  Map,
  CheckCircle2,
  Circle,
  Sparkles,
  ExternalLink,
  BookOpen,
  ChevronRight,
  Loader2,
} from 'lucide-react';

export const LearningRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await studentService.getRoadmap();
      if (res.success && res.roadmap) {
        setRoadmap(res.roadmap);
      } else {
        setError('Could not load roadmap.');
      }
    } catch (err) {
      setError('Unable to load your Learning Roadmap. Please try again.');
    } finally {
      setLoading(false);
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

    // Recalculate overall completion
    const totalProgress = updatedModules.reduce((sum, m) => sum + m.progress, 0);
    const overallCompletion = updatedModules.length > 0
      ? Math.round(totalProgress / updatedModules.length)
      : 0;

    setRoadmap({ ...roadmap, modules: updatedModules, overallCompletion });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs text-slate-500 dark:text-slate-400">Building your personalized roadmap...</p>
      </div>
    );
  }

  // Empty state: no skills added yet
  const hasModules = roadmap && roadmap.modules && roadmap.modules.length > 0;

  if (error || !roadmap || !hasModules) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Map className="w-6 h-6 text-blue-500" />
            Learning Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your personalized week-by-week skill learning plan.
          </p>
        </div>
        <div className="bg-white dark:bg-[#111C38] border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center">
          <Map className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            No Roadmap Generated Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Add your skills from the <strong>My Skills</strong> page and your personalized week-by-week learning roadmap will be automatically generated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Personalized Learning Path
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              {roadmap.careerTrack}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Based on your verified skills — one skill per week, at your own pace.
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
      {roadmap.recommendedSkills && roadmap.recommendedSkills.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
            Skills to Add Next:
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
      )}

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
      {roadmap.curatedResources && roadmap.curatedResources.length > 0 && (
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
      )}
    </div>
  );
};
