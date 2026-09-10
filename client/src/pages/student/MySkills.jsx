import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/roleServices';
import { Modal } from '../../components/common/Modal';
import {
  Sparkles,
  Plus,
  Search,
  Code2,
  Loader2,
} from 'lucide-react';

export const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 'Intermediate',
  });

  const categories = ['Frontend', 'Backend', 'Data Science & AI', 'DevOps & Cloud', 'Core CS', 'Mobile', 'UI/UX', 'Other'];

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await studentService.getSkills();
      if (res.success && res.skills) {
        setSkills(res.skills);
      } else {
        setError('Could not load skills.');
      }
    } catch (err) {
      setError('Unable to load your skills. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setFormData({ name: '', category: 'Frontend', level: 'Intermediate' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await studentService.addSkill(formData);
      if (res.success && res.skills) {
        setSkills(res.skills);
      }
    } catch (err) {
      setSkills((prev) => [
        ...prev,
        { _id: 'local-' + Date.now(), ...formData },
      ]);
    }
    setIsModalOpen(false);
  };

  const filteredSkills = skills.filter((skill) => {
    return skill.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            My Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Showcase your skills, build your profile, and track your career growth.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Controls: Search */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Node.js, Python)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
          <p className="text-xs text-slate-400">Loading your skills...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-4 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && skills.length === 0 && (
        <div className="bg-white dark:bg-[#111C38] border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center">
          <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            No Skills Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-4">
            Upload your resume or add your skills to build your profile.
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Your First Skill
          </button>
        </div>
      )}

      {/* Skills Grid */}
      {!loading && !error && skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill._id || idx}
              className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {skill.category || 'Skill'} • {skill.level || 'Intermediate'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Skill"
        subtitle="Add a technical skill to your profile"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              placeholder="e.g. React.js, Python, Docker"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Proficiency Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>
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
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Save Skill
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
