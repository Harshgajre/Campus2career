import React, { useState, useEffect } from 'react';
import { companyService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Calendar,
  Plus,
  Video,
  Clock,
  User,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    roleTitle: 'Frontend Developer Intern',
    date: '2026-09-10',
    time: '11:00 AM IST',
    type: 'Technical Round 1',
    meetingLink: 'https://meet.google.com/xyz-interview-room',
    interviewerName: 'Alex Morgan',
    notes: 'React state architecture, custom hooks, and live coding.',
  });

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const res = await companyService.getInterviews();
      if (res.success && res.interviews) {
        setInterviews(res.interviews);
      }
    } catch (err) {
      console.warn('Fallback interviews');
    }
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const res = await companyService.scheduleInterview(formData);
      if (res.success) {
        setInterviews([res.interview, ...interviews]);
      }
    } catch (err) {
      setInterviews([
        {
          _id: 'local-' + Date.now(),
          ...formData,
          status: 'Scheduled',
        },
        ...interviews,
      ]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Candidate',
      accessor: 'studentName',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{row.studentName}</p>
          <p className="text-[11px] text-slate-400">{row.studentEmail}</p>
        </div>
      ),
    },
    {
      header: 'Target Role',
      accessor: 'roleTitle',
      render: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {row.roleTitle}
        </span>
      ),
    },
    {
      header: 'Round / Type',
      accessor: 'type',
      render: (row) => <Badge variant="green" size="xs">{row.type}</Badge>,
    },
    {
      header: 'Schedule',
      accessor: 'date',
      render: (row) => (
        <span className="text-xs">
          {row.date} • {row.time}
        </span>
      ),
    },
    {
      header: 'Interviewer',
      accessor: 'interviewerName',
    },
    {
      header: 'Meeting Link',
      render: (row) => (
        <a
          href={row.meetingLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-blue-500 hover:underline font-semibold"
        >
          <Video className="w-3.5 h-3.5" />
          Join Call
        </a>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-500" />
            Interview Schedule & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Coordinate virtual technical rounds, assign panel evaluators, and record candidate ratings.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Schedule Interview
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={interviews}
        searchKey="studentName"
        searchPlaceholder="Search candidate or role..."
      />

      {/* Schedule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Technical Interview Round"
        subtitle="Set date, video call link, and evaluator assignment"
      >
        <form onSubmit={handleSchedule} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                placeholder="Harsh Gajre"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Candidate Email
              </label>
              <input
                type="email"
                placeholder="harsh@campus2career.com"
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interview Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Time Slot
              </label>
              <input
                type="text"
                placeholder="11:00 AM IST"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Google Meet / Zoom URL
            </label>
            <input
              type="url"
              placeholder="https://meet.google.com/..."
              value={formData.meetingLink}
              onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Interviewer Name
            </label>
            <input
              type="text"
              placeholder="Alex Morgan (Principal UI Engineer)"
              value={formData.interviewerName}
              onChange={(e) => setFormData({ ...formData, interviewerName: e.target.value })}
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
              Send Calendar Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
