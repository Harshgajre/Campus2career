import React, { useState, useEffect } from 'react';
import { collegeService } from '../../services/roleServices';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  Award,
  Filter,
  Eye,
  CheckCircle2,
  FileText,
  ExternalLink,
} from 'lucide-react';

export const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await collegeService.getStudents();
      if (res.success && res.students) {
        setStudents(res.students);
      }
    } catch (err) {
      console.warn('Fallback students');
    }
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const columns = [
    {
      header: 'Student',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">{row.name}</p>
            <p className="text-[10px] text-slate-400 font-mono">{row.rollNumber}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
    },
    {
      header: 'CGPA',
      accessor: 'cgpa',
      render: (row) => <span className="font-semibold">{row.cgpa} / 10</span>,
    },
    {
      header: 'Verified Skills',
      accessor: 'topSkills',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.topSkills?.slice(0, 3).map((s, idx) => (
            <span
              key={idx}
              className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50 text-[10px] font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Employability',
      accessor: 'employabilityScore',
      render: (row) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {row.employabilityScore}% Match
        </span>
      ),
    },
    {
      header: 'Status / Placement',
      accessor: 'internshipStatus',
      render: (row) => (
        <Badge variant={row.internshipStatus?.includes('Placed') ? 'green' : 'purple'} size="xs">
          {row.internshipStatus}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <button
          onClick={() => handleViewProfile(row)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
        >
          <Eye className="w-3.5 h-3.5" />
          Passport
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-500" />
          Campus Student Roster & Skill Tracking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Monitor student cohorts, verified competencies, and track placement readiness across departments.
        </p>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={students}
        searchKey="name"
        searchPlaceholder="Search student by name, roll number, or department..."
      />

      {/* Student Passport Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Student Skill Passport: ${selectedStudent?.name || ''}`}
        subtitle={`Roll No: ${selectedStudent?.rollNumber || ''} • ${selectedStudent?.department || ''}`}
      >
        {selectedStudent && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/60">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/40"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {selectedStudent.name}
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                  {selectedStudent.department} • Semester {selectedStudent.semester} (CGPA: {selectedStudent.cgpa})
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    Employability Score: {selectedStudent.employabilityScore}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] mb-2">
                Verified Skill Competencies
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.topSkills?.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Placement Drive Status:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {selectedStudent.internshipStatus}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 rounded-lg shadow-sm"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
