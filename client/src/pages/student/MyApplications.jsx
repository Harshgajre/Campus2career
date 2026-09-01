import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import {
  FileText,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await studentService.getApplications();
      if (res.success && res.applications) {
        setApplications(res.applications);
      }
    } catch (err) {
      console.warn('Fallback applications');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interview Scheduled':
        return <Badge variant="blue" size="sm">Interview Scheduled</Badge>;
      case 'Under Review':
        return <Badge variant="amber" size="sm">Under Review</Badge>;
      case 'Shortlisted':
        return <Badge variant="purple" size="sm">Shortlisted</Badge>;
      case 'Selected':
        return <Badge variant="green" size="sm">Selected</Badge>;
      case 'Rejected':
        return <Badge variant="rose" size="sm">Rejected</Badge>;
      default:
        return <Badge variant="default" size="sm">Applied</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          My Applications & Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time status tracking across your internship applications, technical interviews, and challenge submissions.
        </p>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-all hover:border-blue-500/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {app.opportunityTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {app.companyName} • Applied on {app.appliedDate || 'Aug 28, 2026'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(app.status)}
              </div>
            </div>

            {/* Application Details Note & Timeline Status */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>
                  <strong>Recruiter Update:</strong> {app.notes || 'Your application profile is currently with the recruitment panel.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400">
                  Passport Match:
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {app.matchScore || 90}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
