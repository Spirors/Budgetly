import React, { useState, useMemo } from 'react';
import { useDataContext } from '@/context/DataContext';

/**
 * ViewBudgets.tsx
 * 
 * Displays a sortable table of all budgets for the selected month and year.
 * Shows progress, spent, and remaining amounts for each budget.
 * Supports editing and removing budgets.
 */

interface ViewBudgetsProps {
  month: number;
  year: number;
  onEditBudget?: (budget: { id: string; name: string; max: number }) => void;
  onRemoveBudget?: (budget: { id: string; name: string; max: number }) => void;
}

type SortKey = 'name' | 'max';
type SortDirection = 'ascending' | 'descending';

export default function ViewBudgets({ month, year, onEditBudget, onRemoveBudget }: ViewBudgetsProps) {
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

  // Add a virtual "Uncategorized" budget if there are any uncategorized transactions
  const hasUncategorized = useMemo(
    () => transactions && transactions.some(t => !t.budgetId || t.budgetName === 'Uncategorized'),
    [transactions]
  );

  const budgetsWithUncategorized = useMemo(() => {
    if (!hasUncategorized) return sortedBudgets;
    // Only add if not already present
    const alreadyPresent = sortedBudgets.some(b => b.name === 'Uncategorized');
    if (alreadyPresent) return sortedBudgets;
    return [
      ...sortedBudgets,
      {
        id: 'uncategorized',
        userId: '',
        name: 'Uncategorized',
        max: 0,
        created_at: '',
      },
    ];
  }, [sortedBudgets, hasUncategorized]);

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
    if (budgetName === 'Uncategorized') {
      const filtered = transactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          (!t.budgetId || t.budgetName === 'Uncategorized') &&
          transactionDate.getUTCMonth() === month &&
          transactionDate.getUTCFullYear() === year
        );
      });
      return filtered.reduce((total, t) => total + t.amount, 0);
    }
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

  if (budgetsWithUncategorized.length === 0) {
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
      </div>

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
            {budgetsWithUncategorized.map((budget) => {
              const actual = calculateActual(budget.name);
              const percentageUsed = budget.max > 0 ? (actual / budget.max) * 100 : 0;

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
                    {budget.id !== 'uncategorized' && (
                      <>
                        <button
                          onClick={() => onEditBudget && onEditBudget({ id: budget.id, name: budget.name, max: budget.max })}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onRemoveBudget && onRemoveBudget({ id: budget.id, name: budget.name, max: budget.max })}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}