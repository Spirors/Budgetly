import React, { useState, useMemo } from 'react';
import { useDataContext } from '@/context/DataContext';

interface ViewBudgetsProps {
  month: number;
  year: number;
}

type SortKey = 'name' | 'max';
type SortDirection = 'ascending' | 'descending';

export default function ViewBudgets({ month, year }: ViewBudgetsProps) {
  const { budgets, transactions } = useDataContext();
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'max',
    direction: 'descending',
  });

  // For displaying the budgets
  const sortedBudgets = useMemo(() => {
    if (!budgets) return [];
    return [...budgets].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [budgets, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Calculate actual spending for each budget
  const calculateActual = (budgetName: string) => {
    if (!transactions) return 0;
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.budgetName === budgetName &&
        transactionDate.getUTCMonth() === month &&
        transactionDate.getUTCFullYear() === year
      );
    });
    return filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  // To remove a budget
  const removeBudget = async (id: string) => {
    // To be implemented in a future chapter
  };

  if (sortedBudgets.length === 0) {
    return (
      <div className='p-6'>
        <h2 className="text-xl font-bold mb-4">Budgets</h2>
        <p className="text-gray-500">No budgets found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Current Budgets</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
            </svg>
          </button>
        </div>
      </div>

      {sortedBudgets.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No budgets</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new budget.</p>
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <button onClick={() => requestSort('name')} className="group inline-flex">
                    Name
                    <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible">
                      {sortConfig.key === 'name' ? (
                        sortConfig.direction === 'ascending' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Progress
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  <button onClick={() => requestSort('max')} className="group inline-flex">
                    Budgeted
                    <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible">
                      {sortConfig.key === 'max' ? (
                        sortConfig.direction === 'ascending' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Spent
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Remaining
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedBudgets.map((budget) => {
                const actual = calculateActual(budget.name);
                const percentageUsed = (actual / budget.max) * 100;
                
                return (
                  <tr key={budget.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                      {budget.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            percentageUsed > 90 ? 'bg-red-500' :
                            percentageUsed > 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(budget.max)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(actual)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(budget.max - actual)}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => removeBudget(budget.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}