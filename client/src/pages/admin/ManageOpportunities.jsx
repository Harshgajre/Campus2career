import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Briefcase, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ManageOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      const res = await publicService.getOpportunities();
      if (res.success && res.opportunities) {
        setOpportunities(res.opportunities);
      }
    } catch (err) {
      console.warn('Fallback opportunities');
    }
  };

  const handleDelete = (id) => {
    setOpportunities((prev) => prev.filter((o) => o._id !== id));
  };

  const columns = [
    {
      header: 'Opportunity Title',
      accessor: 'title',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{row.title}</p>
          <p className="text-[11px] text-slate-400">{row.companyName}</p>
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => <Badge variant="orange" size="xs">{row.type}</Badge>,
    },
    {
      header: 'Location',
      accessor: 'location',
    },
    {
      header: 'Stipend / Package',
      accessor: 'stipend',
      render: (row) => <span className="font-semibold text-emerald-500">{row.stipend}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge variant="green" size="xs">{row.status}</Badge>,
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="text-xs text-rose-500 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Moderate / Remove
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-orange-500" />
          Global Opportunity Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Audit live employer job and internship listings across the Campus2Career platform.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={opportunities}
        searchKey="title"
        searchPlaceholder="Search opportunity by title or company..."
      />
    </div>
  );
};
