
import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardStats from './components/DashboardStats';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPayments: 0,
    totalAnnouncements: 0,
    totalEvents: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalPayments: 89,
        totalAnnouncements: 12,
        totalEvents: 8
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          <DashboardStats stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
