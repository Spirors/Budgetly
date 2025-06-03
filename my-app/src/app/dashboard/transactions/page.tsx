"use client"
import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import MonthNavbar from '@/components/Common/MonthNavbar';
import AddTransaction from '@/components/Transaction/AddTransaction';
import ViewTransactions from '@/components/Transaction/ViewTransactions';

export default function Transactions() {
  const { user } = useUserContext();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
  }, []);

  if (selectedMonth === null || selectedYear === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          New Transaction
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
          <ViewTransactions month={selectedMonth} year={selectedYear} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          {showAddForm ? (
            <AddTransaction onClose={() => setShowAddForm(false)} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Add a transaction</h3>
              <p className="text-gray-500 mb-4">Track your spending by adding new transactions</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                + New Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}