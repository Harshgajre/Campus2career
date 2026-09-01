import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Trophy, Trash2, Award, Users } from 'lucide-react';

export const ManageChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const res = await publicService.getChallenges();
      if (res.success && res.challenges) {
        setChallenges(res.challenges);
      }
    } catch (err) {
      console.warn('Fallback challenges');
    }
  };

  const handleDelete = (id) => {
    setChallenges((prev) => prev.filter((c) => c._id !== id));
  };

  const columns = [
    {
      header: 'Challenge Title',
      accessor: 'title',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100">{row.title}</p>
          <p className="text-[11px] text-slate-400">Sponsor: {row.companyName}</p>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
    },
    {
      header: 'Difficulty',
      accessor: 'difficulty',
      render: (row) => <Badge variant="orange" size="xs">{row.difficulty}</Badge>,
    },
    {
      header: 'Prize Bounty',
      accessor: 'prizePoints',
      render: (row) => <span className="font-bold text-amber-500">{row.prizePoints}</span>,
    },
    {
      header: 'Participants',
      accessor: 'participantsCount',
      render: (row) => <span>{row.participantsCount} Students</span>,
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="text-xs text-rose-500 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-orange-500" />
          Challenge & Hackathon Moderation Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Review, approve, and audit prize bounties and problem statements across employer-sponsored hackathons.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={challenges}
        searchKey="title"
        searchPlaceholder="Search challenge by title or sponsor..."
      />
    </div>
  );
};
