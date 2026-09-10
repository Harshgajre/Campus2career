import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/roleServices';
import { Badge } from '../../components/common/Badge';
import {
  FileText,
  Building2,
  Clock,
  Loader2,
} from 'lucide-react';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
};

export const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await studentService.getApplications();
      if (res.success && res.applications) {
        setApplications(res.applications);
      } else {
        setError('Could not load applications.');
      }
    } catch (err) {
      setError('Unable to load your applications. Please try again.');
    } finally {
      setLoading(false);
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

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
          <p className="text-xs text-slate-400">Loading your applications...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-4 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && applications.length === 0 && (
        <div className="bg-white dark:bg-[#111C38] border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            No Applications Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            You haven't applied to any opportunities yet. Browse opportunities and apply to get started.
          </p>
        </div>
      )}

      {/* Applications List */}
      {!loading && !error && applications.length > 0 && (
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
                      {app.opportunityTitle || '—'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {app.companyName || '—'} • Applied on {formatDate(app.createdAt || app.appliedDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(app.status)}
                </div>
              </div>

              {/* Application Details */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>
                    <strong>Recruiter Update:</strong>{' '}
                    {app.notes || 'Your application profile is currently with the recruitment panel.'}
                  </span>
                </div>

                {app.matchScore != null && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      Passport Match:
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {app.matchScore}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
