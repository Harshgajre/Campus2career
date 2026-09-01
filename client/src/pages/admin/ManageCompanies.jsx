import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Building2, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await adminService.getCompanies();
      if (res.success && res.companies) {
        setCompanies(res.companies);
      }
    } catch (err) {
      console.warn('Fallback admin companies');
    }
  };

  const toggleVerification = (id) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, verifiedStatus: c.verifiedStatus === 'verified' ? 'pending' : 'verified' }
          : c
      )
    );
  };

  const columns = [
    {
      header: 'Company Name',
      accessor: 'companyName',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{row.companyName}</p>
          <p className="text-[11px] text-slate-400">{row.location}</p>
        </div>
      ),
    },
    {
      header: 'Industry Domain',
      accessor: 'industryType',
    },
    {
      header: 'Recruiter Contact',
      accessor: 'hrName',
    },
    {
      header: 'Open Jobs',
      accessor: 'openOpportunities',
      render: (row) => <span>{row.openOpportunities} Active</span>,
    },
    {
      header: 'Verification Status',
      accessor: 'verifiedStatus',
      render: (row) => (
        <Badge variant={row.verifiedStatus === 'verified' ? 'green' : 'amber'} size="xs">
          {row.verifiedStatus === 'verified' ? 'Verified Partner' : 'Pending Approval'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          onClick={() => toggleVerification(row._id)}
          className="text-xs font-semibold text-orange-500 hover:underline"
        >
          {row.verifiedStatus === 'verified' ? 'Revoke Approval' : 'Approve Company'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-orange-500" />
          Enterprise & Recruiter Approvals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Verify company credentials, inspect business domain registrations, and authorize recruiter portals.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={companies}
        searchKey="companyName"
        searchPlaceholder="Search company by name or industry..."
      />
    </div>
  );
};
