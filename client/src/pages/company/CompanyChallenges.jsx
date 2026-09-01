import React, { useState } from 'react';
import { Trophy, Plus, Users, Award, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const CompanyChallenges = () => {
  const [challenges, setChallenges] = useState([
    {
      id: '1',
      title: 'React & Tailwind Enterprise Dashboard UI',
      difficulty: 'Intermediate',
      submissionsCount: 42,
      deadline: '1w left',
      prize: '₹25,000 + Direct Interview Call',
      requiredSkills: ['React', 'Tailwind CSS', 'Recharts'],
    },
    {
      id: '2',
      title: 'High-Concurrency Rate Limiter in Go / Node.js',
      difficulty: 'Advanced',
      submissionsCount: 18,
      deadline: '4d left',
      prize: '₹35,000 + Internship Offer',
      requiredSkills: ['Node.js', 'Redis', 'Docker'],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'Intermediate',
    prize: '₹25,000 Prize',
    deadline: '1w left',
    requiredSkills: '',
    description: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    setChallenges([
      ...challenges,
      {
        id: 'chal-' + Date.now(),
        ...formData,
        submissionsCount: 0,
        requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-500" />
            Company-Sponsored Skill Hackathons & Challenges
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Host live coding challenges to evaluate student code quality and shortlist top engineering talent.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Challenge
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {challenges.map((ch) => (
          <div
            key={ch.id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {ch.title}
                </h3>
                <Badge variant="green" size="xs">{ch.difficulty}</Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 my-3 text-xs flex items-center justify-between">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {ch.prize}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ch.deadline}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {ch.requiredSkills?.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 text-[10px] font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                <strong className="text-emerald-600 dark:text-emerald-400">{ch.submissionsCount}</strong> Code Submissions
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 cursor-pointer hover:underline">
                Evaluate Submissions →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Industry Skill Challenge"
        subtitle="Set problem statement, prize bounty, and technical criteria"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Challenge Title
            </label>
            <input
              type="text"
              placeholder="e.g. Distributed Token Bucket Rate Limiter"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Prize Bounty / Fast-Track
              </label>
              <input
                type="text"
                placeholder="₹25,000 + Interview"
                value={formData.prize}
                onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Required Skills (comma-separated)
            </label>
            <input
              type="text"
              placeholder="React, TypeScript, Recharts"
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
            >
              Launch Challenge
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
