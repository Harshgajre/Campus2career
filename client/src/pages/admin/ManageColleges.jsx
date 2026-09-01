import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { GraduationCap } from 'lucide-react';

export const ManageColleges = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      const res = await adminService.getColleges();
      if (res.success && res.colleges) {
        setColleges(res.colleges);
      }
    } catch (err) {
      console.warn('Fallback admin colleges');
    }
  };

  const toggleApproval = (id) => {
    setColleges((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, approvedStatus: c.approvedStatus === 'approved' ? 'pending' : 'approved' }
          : c
      )
    );
  };

  const columns = [
    {
      header: 'Institution Name',
      accessor: 'institutionName',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{row.institutionName}</p>
          <p className="text-[11px] text-slate-400 font-mono">AISHE Code: {row.code}</p>
        </div>
      ),
    },
    {
      header: 'Location',
      render: (row) => <span>{row.city}, {row.state}</span>,
    },
    {
      header: 'Dean / Contact',
      accessor: 'contactPerson',
    },
    {
      header: 'Student Base',
      accessor: 'totalStudents',
      render: (row) => <span>{row.totalStudents} Enrolled</span>,
    },
    {
      header: 'Approval Status',
      accessor: 'approvedStatus',
      render: (row) => (
        <Badge variant={row.approvedStatus === 'approved' ? 'green' : 'amber'} size="xs">
          {row.approvedStatus === 'approved' ? 'Approved Campus' : 'Pending Verification'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          onClick={() => toggleApproval(row._id)}
          className="text-xs font-semibold text-orange-500 hover:underline"
        >
          {row.approvedStatus === 'approved' ? 'Revoke Approval' : 'Approve Campus'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-orange-500" />
          University & College Campus Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Authorize university portals, manage AISHE code validations, and monitor affiliated student cohorts.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={colleges}
        searchKey="institutionName"
        searchPlaceholder="Search college by name or code..."
      />
    </div>
  );
};
