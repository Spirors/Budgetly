import React from 'react';

import DashboardLayout from '../components/ui/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout
      headerTitle="Dashboard"
    >
      <div className="p-4">
        {/* Your Dashboard content goes here */}
      </div>
    </DashboardLayout>
  );
}