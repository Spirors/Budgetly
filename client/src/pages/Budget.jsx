import React from 'react'

import DashboardLayout from '../components/ui/DashboardLayout';
import Header from '../components/ui/Header';

export default function Budget() {
  return (
    <DashboardLayout>
      <Header title="Budget">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Budget
        </button>
      </Header>
    </DashboardLayout>
  )
}
