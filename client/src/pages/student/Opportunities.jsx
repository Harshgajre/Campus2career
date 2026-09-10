import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/roleServices';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Send,
  Building,
  CheckCircle2,
  DollarSign,
  Filter,
} from 'lucide-react';

export const Opportunities = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      const res = await studentService.getOpportunities();
      if (res.success && res.opportunities) {
        // Deduplicate by ID
        const unique = Array.from(new Map(res.opportunities.map(o => [o._id, o])).values());
        setOpportunities(unique);
      }
    } catch (err) {
      setErrorMsg('Unable to load opportunities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenApply = (opp) => {
    setSelectedOpp(opp);
    setCoverNote('I am excited to apply for this opportunity and contribute my technical skills.');
    setAppliedSuccess(false);
    setErrorMsg('');
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await studentService.applyOpportunity({
        opportunityId: selectedOpp._id,
        coverNote,
      });
      if (res.success) {
        setAppliedSuccess(true);
        setTimeout(() => {
          setIsApplyModalOpen(false);
        }, 1500);
      } else {
        setErrorMsg(res.message || 'Application failed');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Application failed. Please try again.');
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opp.requiredSkills && opp.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesType = selectedType === 'All' || opp.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-500" />
          Internships & Career Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Explore enterprise internships, full-time hiring drives, and industry trainee openings matching your Skill Passport.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role title, company, or required technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Type:
          </span>
          {['All', 'Internship', 'Job', 'Training'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-xs text-slate-500 dark:text-slate-400">Loading opportunities...</p>
        </div>
      ) : filteredOpportunities.length === 0 ? (
        <div className="bg-white dark:bg-[#111C38] border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
            No Matching Opportunities Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or role filters to view available opportunities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp._id}
              className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                      {opp.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {opp.companyName}
                    </p>
                  </div>
                  <Badge variant={opp.type === 'Job' ? 'green' : 'blue'} size="xs">
                    {opp.type}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 my-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {opp.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5" />
                    {opp.stipend}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {opp.deadline}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {opp.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.requiredSkills &&
                    opp.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {opp.openingsCount ? `${opp.openingsCount} Openings` : 'Open Position'}
                </span>

                <button
                  onClick={() => handleOpenApply(opp)}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Apply Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply for ${selectedOpp?.title || ''}`}
        subtitle={`at ${selectedOpp?.companyName || ''}`}
      >
        {appliedSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Application Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your profile credentials have been submitted directly to the recruiter.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 text-xs space-y-1">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Applicant Information:
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                • Name: <span className="font-bold text-slate-700 dark:text-slate-300">{user?.name || 'Student'}</span> ({user?.email})
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                • Phone: <span className="font-bold text-slate-700 dark:text-slate-300">{user?.phone || 'Not provided'}</span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Candidate Note / Cover Note
              </label>
              <textarea
                rows="4"
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Application
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
