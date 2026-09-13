import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Infer active role from path
  let activeRole = 'student';
  if (location.pathname.startsWith('/college')) activeRole = 'college';
  else if (location.pathname.startsWith('/company')) activeRole = 'company';
  else if (location.pathname.startsWith('/admin')) activeRole = 'admin';
  else if (user?.role) activeRole = user.role;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1D] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Dynamic Left Sidebar */}
      <Sidebar
        role={activeRole}
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Body (Offset by sidebar width on desktop) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Header */}
        <Header
          role={activeRole}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Dynamic Route Pages */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Outlet key={user?.id || 'anonymous'} />
        </main>
      </div>
    </div>
  );
};
