import React, { useState } from 'react';
import { UserCheck, Calendar, Eye, Trash2, CheckCircle2, DollarSign } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const ShortlistedCandidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: '1',
      name: 'Harsh Gajre',
      role: 'Frontend Developer Intern',
      department: 'Computer Science',
      college: 'MIT Institute of Technology',
      matchScore: 94,
      skills: ['React', 'JavaScript', 'Tailwind', 'Node.js'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: '2',
      name: 'Priya Singh',
      role: 'UI/UX Product Designer',
      department: 'Information Technology',
      college: 'Apex Institute of Technology',
      matchScore: 91,
      skills: ['Figma', 'Design Systems', 'React', 'CSS3'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    },
  ]);

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeCand, setActiveCand] = useState(null);

  const handleOpenSchedule = (cand) => {
    setActiveCand(cand);
    setIsScheduleOpen(true);
  };

  const handleRemove = (id) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-emerald-500" />
          Shortlisted Engineering Candidates
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Evaluate side-by-side competency comparisons and schedule technical interviews.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {cand.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {cand.role}
                    </p>
                    <p className="text-[11px] text-slate-400">{cand.college}</p>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                  {cand.matchScore}% Match
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 my-3">
                {cand.skills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => handleRemove(cand.id)}
                className="text-xs text-rose-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>

              <button
                onClick={() => handleOpenSchedule(cand)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                Schedule Interview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
