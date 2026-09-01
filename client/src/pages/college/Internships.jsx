import React, { useState } from 'react';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Briefcase, Building2, User, Calendar, CheckCircle2 } from 'lucide-react';

export const Internships = () => {
  const [internships] = useState([
    {
      _id: '1',
      studentName: 'Harsh Gajre',
      rollNumber: 'STU-2024-001',
      companyName: 'TechCorp Solutions',
      roleTitle: 'Full Stack Engineering Intern',
      department: 'Computer Science',
      stipend: '₹35,000 / mo',
      duration: '6 Months (Jun - Dec 2026)',
      mentorName: 'Siddharth Rao',
      progress: 65,
      status: 'Active',
    },
    {
      _id: '2',
      studentName: 'Priya Singh',
      rollNumber: 'STU-2024-015',
      companyName: 'DesignStudio Innovations',
      roleTitle: 'UI/UX Design Specialist',
      department: 'Information Technology',
      stipend: '₹25,000 / mo',
      duration: '3 Months (Jul - Oct 2026)',
      mentorName: 'Riya Patel',
      progress: 50,
      status: 'Active',
    },
    {
      _id: '3',
      studentName: 'Dev Mehta',
      rollNumber: 'STU-2024-042',
      companyName: 'CodeSoft Global',
      roleTitle: 'Backend Architecture Intern',
      department: 'Computer Science',
      stipend: '₹28,000 / mo',
      duration: '6 Months (Jun - Dec 2026)',
      mentorName: 'Sanjay Deshmukh',
      progress: 70,
      status: 'Active',
    },
  ]);

  const columns = [
    {
      header: 'Student',
      accessor: 'studentName',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{row.studentName}</p>
          <p className="text-[10px] text-slate-400 font-mono">{row.rollNumber} • {row.department}</p>
        </div>
      ),
    },
    {
      header: 'Company & Role',
      accessor: 'companyName',
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{row.companyName}</p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">{row.roleTitle}</p>
        </div>
      ),
    },
    {
      header: 'Stipend',
      accessor: 'stipend',
      render: (row) => <span className="font-bold text-emerald-600 dark:text-emerald-400">{row.stipend}</span>,
    },
    {
      header: 'Mentor Assigned',
      accessor: 'mentorName',
    },
    {
      header: 'Duration',
      accessor: 'duration',
      render: (row) => <span className="text-[11px] text-slate-500">{row.duration}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge variant="green" size="xs">{row.status}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-purple-500" />
          Campus Internship Drives & Cohort Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time tracking of 85+ active industry internships across partner enterprises.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={internships}
        searchKey="studentName"
        searchPlaceholder="Search by student name, company, or role..."
      />
    </div>
  );
};
