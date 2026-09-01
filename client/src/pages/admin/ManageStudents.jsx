import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Users, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ManageStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await adminService.getStudents();
      if (res.success && res.students) {
        setStudents(res.students);
      }
    } catch (err) {
      console.warn('Fallback admin students');
    }
  };

  const toggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s._id === id
          ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' }
          : s
      )
    );
  };

  const columns = [
    {
      header: 'Student Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{row.name}</p>
          <p className="text-[11px] text-slate-400">{row.email}</p>
        </div>
      ),
    },
    {
      header: 'College / Institute',
      accessor: 'collegeName',
    },
    {
      header: 'Department',
      accessor: 'department',
    },
    {
      header: 'Competencies',
      accessor: 'skillsCount',
      render: (row) => <span>{row.skillsCount} Skills Verified</span>,
    },
    {
      header: 'Employability Score',
      accessor: 'employabilityScore',
      render: (row) => (
        <span className="font-bold text-orange-500">{row.employabilityScore}%</span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'green' : 'rose'} size="xs">
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          onClick={() => toggleStatus(row._id)}
          className="text-xs font-semibold text-orange-500 hover:underline"
        >
          {row.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-orange-500" />
          Platform Students Administration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Audit student identity credentials, manage verification flags, and enforce platform conduct policies.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={students}
        searchKey="name"
        searchPlaceholder="Search student by name, email, or university..."
      />
    </div>
  );
};
