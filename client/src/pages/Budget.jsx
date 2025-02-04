import React from 'react';

import DashboardLayout from '../components/ui/DashboardLayout';

export default function Budget() {
  return (
    <DashboardLayout
      headerTitle="Budget"
      headerChildren={
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mr-20 rounded">
          Add Budget
        </button>
      }
    >
      <div className="p-4">
        {/* Your budget content goes here */}
      </div>
    </DashboardLayout>
  );
}