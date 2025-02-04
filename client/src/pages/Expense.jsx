import React from 'react';

import DashboardLayout from '../components/ui/DashboardLayout';

export default function Expense() {
  return (
    <DashboardLayout
      headerTitle="Expense"
      headerChildren={
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mr-20 rounded">
          Add Expense
        </button>
      }
    >
      <div className="p-4">
        {/* Your Expense content goes here */}
      </div>
    </DashboardLayout>
  );
}