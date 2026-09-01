import React, { useState, useEffect } from 'react';
import { collegeService } from '../../services/roleServices';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import {
  BookOpen,
  Plus,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const TrainingPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsCovered: '',
    department: 'Computer Science',
    trainerName: '',
    startDate: '2026-09-20',
    endDate: '2026-11-20',
    maxCapacity: 100,
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const res = await collegeService.getTrainingPrograms();
      if (res.success && res.programs) {
        setPrograms(res.programs);
      }
    } catch (err) {
      console.warn('Fallback programs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skillsCovered.split(',').map((s) => s.trim()).filter(Boolean);

    try {
      const res = await collegeService.createTrainingProgram({
        ...formData,
        skillsCovered: skillsArray,
      });
      if (res.success) {
        setPrograms([res.program, ...programs]);
      }
    } catch (err) {
      setPrograms([
        {
          _id: 'local-' + Date.now(),
          ...formData,
          skillsCovered: skillsArray,
          enrolledCount: 1,
          progress: 0,
          status: 'upcoming',
        },
        ...programs,
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-500" />
            Curriculum Training Bootcamps & Workshops
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Launch targeted industrial training modules to close cohort skill gaps and prepare students for recruitments.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md shadow-purple-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Training Program
        </button>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((prog) => (
          <div
            key={prog._id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-purple-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                  {prog.department || 'Computer Science'}
                </span>
                <Badge variant={prog.status === 'active' ? 'green' : 'purple'} size="xs">
                  {prog.status === 'active' ? 'Active' : 'Upcoming'}
                </Badge>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                {prog.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Trainer: {prog.trainerName}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                {prog.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {prog.skillsCovered &&
                  prog.skillsCovered.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50 text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-500" />
                  {prog.enrolledCount} / {prog.maxCapacity || 150} Enrolled
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {prog.startDate}
                </span>
              </div>

              {/* Progress */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${prog.progress || 35}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Program Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Industrial Training Program"
        subtitle="Define syllabus, targeted skill sets, and assign student cohorts"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Program Title
            </label>
            <input
              type="text"
              placeholder="e.g. Advanced Docker & Kubernetes Cloud Engineering"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description & Objectives
            </label>
            <textarea
              rows="3"
              placeholder="Detailed course summary, learning outcomes, and assessment plan..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Key Skills Covered (comma-separated)
            </label>
            <input
              type="text"
              placeholder="Docker, Kubernetes, CI/CD, Linux"
              value={formData.skillsCovered}
              onChange={(e) => setFormData({ ...formData, skillsCovered: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Instructor / Mentor
              </label>
              <input
                type="text"
                placeholder="Dr. R. K. Sharma"
                value={formData.trainerName}
                onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Max Student Intake
              </label>
              <input
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
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
              className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm"
            >
              Launch Bootcamp
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
