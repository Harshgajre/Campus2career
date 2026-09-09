import React, { useState, useEffect } from 'react';
import { companyService } from '../../services/roleServices';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import {
  Briefcase,
  Plus,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
} from 'lucide-react';

export const CompanyOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    location: 'Bangalore (Hybrid)',
    locationType: 'Hybrid',
    stipend: '₹35,000 / month',
    duration: '6 Months',
    deadline: '10d left',
    requiredSkills: '',
    preferredSkills: '',
    description: '',
    openingsCount: 3,
  });

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      const res = await companyService.getOpportunities();
      if (res.success && res.opportunities) {
        setOpportunities(res.opportunities);
      }
    } catch (err) {
      console.warn('Unable to load opportunities', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqArray = formData.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean);
    const prefArray = formData.preferredSkills.split(',').map((s) => s.trim()).filter(Boolean);

    try {
      const res = await companyService.createOpportunity({
        ...formData,
        requiredSkills: reqArray,
        preferredSkills: prefArray,
      });
      if (res.success) {
        setOpportunities([res.opportunity, ...opportunities]);
      }
    } catch (err) {
      console.warn('Unable to publish opportunity', err);
      return;
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-500" />
            Manage Job & Internship Postings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Post opportunities, define required skill benchmarks, and review inbound applicant pools.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Post New Opening
        </button>
      </div>

      {/* Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {opportunities.map((opp) => (
          <div
            key={opp._id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {opp.title}
                </h3>
                <Badge variant={opp.status === 'open' ? 'green' : 'default'} size="xs">
                  {opp.status === 'open' ? 'Active & Hiring' : 'Closed'}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 my-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {opp.location}
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {opp.stipend}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {opp.deadline}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                {opp.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {opp.requiredSkills?.map((sk, idx) => (
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
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                <strong className="text-emerald-600 dark:text-emerald-400">{opp.applicationsCount || 34}</strong> Candidates Applied
              </span>
              <span className="text-slate-400 text-[11px]">
                {opp.openingsCount || 2} Open Positions
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Post Career / Internship Opportunity"
        subtitle="Specify candidate requirements to activate automatic AI matching"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Role Title
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend React Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Opportunity Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Internship</option>
                <option>Job</option>
                <option>Training</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Stipend / Package
              </label>
              <input
                type="text"
                placeholder="₹35,000 / month"
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Bangalore / Remote"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Open Vacancies
              </label>
              <input
                type="number"
                value={formData.openingsCount}
                onChange={(e) => setFormData({ ...formData, openingsCount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Required Skills (comma-separated)
            </label>
            <input
              type="text"
              placeholder="React, TypeScript, Tailwind, REST APIs"
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Job Description
            </label>
            <textarea
              rows="3"
              placeholder="Detail role responsibilities and qualifications..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              Publish Opportunity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
