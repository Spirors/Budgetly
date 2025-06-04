"use client"

import { useState, useEffect } from 'react';
import MonthNavbar from '@/components/Common/MonthNavbar';
import AddBudget from '@/components/Budget/AddBudget';
import ViewBudgets from '@/components/Budget/ViewBudgets';
import EditBudget from '@/components/Budget/EditBudget';
import RemoveBudget from '@/components/Budget/RemoveBudget';

/**
 * dashboard/budgets/page.tsx
 * 
 * Budgets management page.
 * Allows users to view, add, edit, and remove budgets for selected months/years.
 */

export default function Budgets() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState<null | { id: string; name: string; max: number }>(null);
  const [removingBudget, setRemovingBudget] = useState<null | { id: string; name: string; max: number }>(null);

  useEffect(() => {
    const now = new Date();
    setSelectedMonth(now.getUTCMonth());
    setSelectedYear(now.getUTCFullYear());
  }, []);

  if (selectedMonth === null || selectedYear === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      {editingBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <EditBudget
              budget={editingBudget}
              onClose={() => setEditingBudget(null)}
            />
          </div>
        </div>
      )}

      {removingBudget && (
        <RemoveBudget
          budgetId={removingBudget.id}
          onClose={() => setRemovingBudget(null)}
        />
      )}

      <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Budget Management</h1>
        <button
          onClick={() => setShowAddBudget(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          + New Budget
        </button>
      </div>

      <MonthNavbar
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <ViewBudgets
            month={selectedMonth}
            year={selectedYear}
            onEditBudget={setEditingBudget}
            onRemoveBudget={setRemovingBudget}
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          {showAddBudget ? (
            <AddBudget onClose={() => setShowAddBudget(false)} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No budget selected</h3>
              <p className="text-gray-500 mb-4">Create a new budget to get started</p>
              <button
                onClick={() => setShowAddBudget(true)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                + Add Budget
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}