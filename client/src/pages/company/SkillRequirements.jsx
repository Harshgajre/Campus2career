import React, { useState } from 'react';
import { Target, Plus, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const SkillRequirements = () => {
  const [requirements, setRequirements] = useState([
    { id: '1', role: 'Frontend Engineer (React)', requiredSkills: ['React.js', 'TypeScript', 'Tailwind CSS', 'State Architecture'], minScore: 85, weight: 'High' },
    { id: '2', role: 'Backend Microservices Engineer', requiredSkills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'], minScore: 80, weight: 'Critical' },
    { id: '3', role: 'UI/UX Product Designer', requiredSkills: ['Figma', 'Prototyping', 'Design Systems', 'Usability Audits'], minScore: 88, weight: 'High' },
  ]);

  const [newRole, setNewRole] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newScore, setNewScore] = useState(80);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newRole || !newSkills) return;
    const skillsArr = newSkills.split(',').map((s) => s.trim()).filter(Boolean);
    setRequirements([
      ...requirements,
      {
        id: 'req-' + Date.now(),
        role: newRole,
        requiredSkills: skillsArr,
        minScore: Number(newScore),
        weight: 'High',
      },
    ]);
    setNewRole('');
    setNewSkills('');
  };

  const handleDelete = (id) => {
    setRequirements((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-emerald-500" />
          Enterprise Skill Criteria & Benchmark Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure precise technical requirements and minimum score thresholds for automatic candidate matching.
        </p>
      </div>

      {/* Add Criteria Card */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-500" /> Define Role Benchmark
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-4">
            <input
              type="text"
              placeholder="Role Title (e.g. AI / ML Engineer)"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div className="sm:col-span-5">
            <input
              type="text"
              placeholder="Required Skills (e.g. Python, PyTorch, SQL)"
              value={newSkills}
              onChange={(e) => setNewSkills(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <input
              type="number"
              min="50"
              max="100"
              placeholder="Min Score %"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center justify-center"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Benchmarks List */}
      <div className="space-y-4">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {req.role}
                </h3>
                <Badge variant="green" size="xs">
                  Min {req.minScore}% Mastery
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {req.requiredSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleDelete(req.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 self-end sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
