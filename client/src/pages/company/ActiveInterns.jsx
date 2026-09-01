import React, { useState, useEffect } from 'react';
import { companyService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { UserPlus, Award, Calendar, CheckCircle2, User } from 'lucide-react';

export const ActiveInterns = () => {
  const [interns, setInterns] = useState([
    {
      _id: 'intern-1',
      name: 'Harsh Gajre',
      roleTitle: 'Full Stack Engineering Intern',
      department: 'Engineering - Cloud Platform',
      startDate: '2026-06-01',
      endDate: '2026-12-01',
      mentorName: 'Siddharth Rao',
      progressPercentage: 65,
      rating: 'Outstanding (9.4/10)',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      _id: 'intern-2',
      name: 'Priya Singh',
      roleTitle: 'Design System & UI Intern',
      department: 'Product & Design',
      startDate: '2026-07-01',
      endDate: '2026-12-31',
      mentorName: 'Riya Patel',
      progressPercentage: 50,
      rating: 'Excellent (9.1/10)',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    },
  ]);

  useEffect(() => {
    loadInterns();
  }, []);

  const loadInterns = async () => {
    try {
      const res = await companyService.getInterns();
      if (res.success && res.interns) {
        setInterns(res.interns);
      }
    } catch (err) {
      console.warn('Fallback interns');
    }
  };

  const columns = [
    {
      header: 'Intern Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">{row.name}</p>
            <p className="text-[11px] text-slate-400">{row.department}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Role',
      accessor: 'roleTitle',
      render: (row) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {row.roleTitle}
        </span>
      ),
    },
    {
      header: 'Mentor',
      accessor: 'mentorName',
    },
    {
      header: 'Duration',
      render: (row) => <span className="text-xs">{row.startDate} to {row.endDate}</span>,
    },
    {
      header: 'Performance Rating',
      accessor: 'rating',
      render: (row) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {row.rating}
        </span>
      ),
    },
    {
      header: 'Status',
      render: () => <Badge variant="green" size="xs">Active</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-emerald-500" />
          Active Engineering Interns & Mentorship
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Track active intern cohorts, mentor reviews, and conversion readiness to full-time engineering roles.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={interns}
        searchKey="name"
        searchPlaceholder="Search intern by name or department..."
      />
    </div>
  );
};
