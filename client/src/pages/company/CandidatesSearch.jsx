import React, { useState, useEffect } from 'react';
import { companyService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  CheckCircle2,
  Bookmark,
  Award,
  Filter,
  UserCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export const CandidatesSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const res = await companyService.getCandidates();
      if (res.success && res.candidates) {
        setCandidates(res.candidates);
      }
    } catch (err) {
      console.warn('Fallback candidates');
    }
  };

  const toggleShortlist = (id) => {
    setCandidates((prev) =>
      prev.map((c) => (c._id === id ? { ...c, shortlisted: !c.shortlisted } : c))
    );
  };

  const filteredCandidates = candidates.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesName = c.name.toLowerCase().includes(term);
    const matchesSkills = c.skills?.some((s) => s.name.toLowerCase().includes(term));
    const matchesDept = c.department?.toLowerCase().includes(term);
    return matchesName || matchesSkills || matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-emerald-500" />
          Pre-Verified Student Talent Pool Discovery
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Filter and discover verified students with verified cryptographic Skill Passports and match scores.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-3 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates by skill (e.g. React, Python), department, or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Candidates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCandidates.map((cand) => (
          <div
            key={cand._id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between"
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
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cand.department} • CGPA: {cand.cgpa}
                    </p>
                    <p className="text-[11px] text-slate-400">{cand.collegeName}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                    {cand.matchPercent}% Match
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Passport Verified</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {cand.skills?.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 text-[10px] font-medium flex items-center gap-1"
                  >
                    {sk.verified && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />}
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCandidate(cand);
                  setIsModalOpen(true);
                }}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Inspect Passport & Portfolio
              </button>

              <button
                onClick={() => toggleShortlist(cand._id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  cand.shortlisted
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {cand.shortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Candidate Passport: ${selectedCandidate?.name || ''}`}
        subtitle={`Match Score: ${selectedCandidate?.matchPercent || 90}% against TechCorp Hiring Benchmark`}
      >
        {selectedCandidate && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-3">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500/40"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {selectedCandidate.name}
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                  {selectedCandidate.department} • {selectedCandidate.collegeName}
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Employability Index: {selectedCandidate.employabilityScore}% • {selectedCandidate.projectsCount} Verified Projects
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] mb-2">
                Evaluated Competencies
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {selectedCandidate.skills?.map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">{sk.name}</span>
                    <span className="font-bold text-emerald-500">{sk.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleShortlist(selectedCandidate._id);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
              >
                {selectedCandidate.shortlisted ? 'Remove Shortlist' : 'Add to Shortlist'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
