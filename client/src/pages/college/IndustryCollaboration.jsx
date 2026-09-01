import React, { useState, useEffect } from 'react';
import { collegeService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import {
  Building2,
  Handshake,
  Users,
  Award,
  Calendar,
  ExternalLink,
  Plus,
} from 'lucide-react';

export const IndustryCollaboration = () => {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    loadCollaborations();
  }, []);

  const loadCollaborations = async () => {
    try {
      const res = await collegeService.getCollaborations();
      if (res.success && res.collaborations) {
        setCollaborations(res.collaborations);
      }
    } catch (err) {
      console.warn('Fallback collaborations');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-purple-500" />
          Industry MoUs & Enterprise Partnerships
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Active academic-industrial partnerships, campus hiring MoUs, and joint research centers.
        </p>
      </div>

      {/* Collaboration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {collaborations.map((collab) => (
          <div
            key={collab.id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-purple-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={collab.logo}
                    alt={collab.companyName}
                    className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {collab.companyName}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Lead: {collab.contactPerson}
                    </p>
                  </div>
                </div>
                <Badge variant="green" size="xs">
                  {collab.status}
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 my-3 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Partnership Scope
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {collab.partnerType}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                Interns Placed: <strong className="text-purple-600 dark:text-purple-400">{collab.internsHired}</strong>
              </span>
              <span className="text-[11px] text-slate-400">Since {collab.establishedYear}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
