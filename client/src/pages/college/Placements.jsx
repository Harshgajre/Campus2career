import React, { useState, useEffect } from 'react';
import { collegeService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import {
  Award,
  TrendingUp,
  Building,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';

export const Placements = () => {
  const [data, setData] = useState({
    stats: {
      totalPlaced: 62,
      averagePackageLPA: 12.4,
      highestPackageLPA: 32.0,
      placementRatePercent: 94.2,
      topRecruiters: ['TechCorp', 'Microsoft', 'CodeSoft', 'Amazon', 'TCS Digital'],
    },
    recentPlacements: [
      { studentName: 'Ananya Sharma', company: 'Microsoft', packageLPA: 32.0, department: 'AI & Data Science', date: 'Aug 2026' },
      { studentName: 'Dev Mehta', company: 'TechCorp Solutions', packageLPA: 18.5, department: 'Computer Science', date: 'Aug 2026' },
      { studentName: 'Priya Singh', company: 'DesignStudio', packageLPA: 16.0, department: 'Information Technology', date: 'Jul 2026' },
      { studentName: 'Sameer Kulkarni', company: 'Amazon AWS', packageLPA: 28.0, department: 'Computer Science', date: 'Jul 2026' },
      { studentName: 'Kavita Joshi', company: 'CodeSoft Global', packageLPA: 14.5, department: 'Information Technology', date: 'Jun 2026' },
    ],
  });

  useEffect(() => {
    loadPlacements();
  }, []);

  const loadPlacements = async () => {
    try {
      const res = await collegeService.getPlacements();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.warn('Fallback placements');
    }
  };

  const columns = [
    {
      header: 'Placed Candidate',
      accessor: 'studentName',
      render: (row) => (
        <span className="font-bold text-slate-900 dark:text-slate-100">
          {row.studentName}
        </span>
      ),
    },
    {
      header: 'Hiring Enterprise',
      accessor: 'company',
    },
    {
      header: 'Department',
      accessor: 'department',
    },
    {
      header: 'CTC Package',
      accessor: 'packageLPA',
      render: (row) => (
        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
          ₹{row.packageLPA} LPA
        </span>
      ),
    },
    {
      header: 'Offer Date',
      accessor: 'date',
    },
    {
      header: 'Status',
      render: () => <Badge variant="green" size="xs">Accepted Offer</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-500" />
          Campus Placements & Annual CTC Statistics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Comprehensive placement records, package distributions, and recruiter reports.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Total Placed</span>
          <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {data.stats.totalPlaced} Students
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">94.2% placement rate</span>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Highest Package</span>
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{data.stats.highestPackageLPA} LPA
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Microsoft Corporation</span>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Average Package</span>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">
            ₹{data.stats.averagePackageLPA} LPA
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">+18% increase vs last year</span>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Top Recruiters</span>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 truncate">
            {data.stats.topRecruiters?.slice(0, 3).join(', ')}
          </h3>
          <span className="text-[11px] text-slate-400 mt-0.5 block">42 Active Hiring Drives</span>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data.recentPlacements || []}
        searchKey="studentName"
        searchPlaceholder="Search placed candidate or recruiter..."
      />
    </div>
  );
};
