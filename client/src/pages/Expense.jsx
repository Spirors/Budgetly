import React from 'react'

import DashboardLayout from '../components/ui/DashboardLayout';
import Header from '../components/ui/Header';

export default function Expense() {
  return (
    <DashboardLayout>
      <Header title="Expense">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Expense
        </button>
      </Header>
    </DashboardLayout>
  )
}
