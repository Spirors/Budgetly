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
    <div className='p-6'>
      <h2 className="text-xl font-bold mb-4">Budgets</h2>
      <div className="overflow-y-auto h-170 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky top-0 py-2 pl-4 w-10 border-b border-stone-300 bg-white" />
              <th
                className="sticky top-0 py-2 pl-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('name')}
                role="columnheader"
                aria-label="Sort by Name"
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th className="sticky top-0 py-2 w-40 border-b border-stone-300 bg-white text-left">
              </th>
              <th
                className="sticky top-0 py-2 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('max')}
                role="columnheader"
                aria-label="Sort by Max"
              >
                Max {sortConfig.key === 'max' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th className="sticky top-0 py-2 w-40 border-b border-stone-300 bg-white cursor-pointer text-left">
                Actual
              </th>
              <th className="sticky top-0 py-2 pr-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left">
                Remaining
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBudgets.map((budget) => {
              const actual = calculateActual(budget.name);
              const percentageUsed = (actual / budget.max) * 100;
              let capsuleColor = 'bg-green-500';

              if (percentageUsed > 75) {
                capsuleColor = 'bg-red-500';
              } else if (percentageUsed > 50) {
                capsuleColor = 'bg-yellow-500';
              }

              return (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="py-2 pl-4 text-left">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeBudget(budget.id)}
                    >
                      X
                    </button>
                  </td>
                  <td className="py-2 pl-4 text-left">{budget.name}</td>
                  <td className="py-2 pl-4 text-left">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${capsuleColor}`}>
                      {percentageUsed.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-left">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(budget.max)}
                  </td>
                  <td className="py-2 pl-4 text-left">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(actual)}
                  </td>
                  <td className="py-2 pl-4 text-left">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(budget.max - actual)}
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