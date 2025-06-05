"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import AccountToggle from '@/components/Common/AccountToggle';
import MonthNavbar from '@/components/Common/MonthNavbar';
import StatCards from '@/components/Dashboard/StatCards';
import SpendingTrendsChart from '@/components/Dashboard/SpendingTrendsChart';
import BudgetBreakdownChart from '@/components/Dashboard/BudgetBreakdownChart';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';

/**
 * dashboard/page.tsx
 * 
 * Main dashboard page showing summary charts, statistics, and recent transactions.
 * Entry point for authenticated users.
 */

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUserContext(); // <-- Make sure your context provides `loading`
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [trendRange, setTrendRange] = useState<'6months' | 'year' | 'lastyear'>('6months');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  useEffect(() => {
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="hidden md:flex items-center gap-4">
          <AccountToggle />
        </div>
      </div>

      <MonthNavbar
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {/* Stats Cards */}
      <StatCards selectedMonth={selectedMonth} selectedYear={selectedYear} />

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between mb-4 w-full">
            <h2 className="text-lg font-semibold text-gray-800">Spending Trends</h2>
            <select
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={trendRange}
              onChange={e => setTrendRange(e.target.value as '6months' | 'year' | 'lastyear')}
            >
              <option value="6months">Last 6 Months</option>
              <option value="year">This Year</option>
              <option value="lastyear">Last Year</option>
            </select>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <div className="w-full max-w-xl">
              <SpendingTrendsChart
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                range={trendRange}
              />
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between mb-4 w-full">
            <h2 className="text-lg font-semibold text-gray-800">Budget Breakdown</h2>
            <span className="text-sm text-gray-500 font-medium">By Category</span>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <div className="w-full max-w-xl">
              <BudgetBreakdownChart selectedMonth={selectedMonth} selectedYear={selectedYear} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <RecentTransactions />
        <button
          className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => router.push('/dashboard/transactions')}
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
}