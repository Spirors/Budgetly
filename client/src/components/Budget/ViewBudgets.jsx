import React, { useContext, useState, useMemo } from 'react';
import { DataContext } from '../../context/DataContext';

export default function ViewBudgets() {
  const { budgets } = useContext(DataContext);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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
              <th
                className="sticky top-0 py-2 pl-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('name')}
                role="columnheader"
                aria-label="Sort by Name"
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
              >
                Placeholder
              </th>
              <th
                className="sticky top-0 py-2 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('max')}
                role="columnheader"
                aria-label="Sort by Max"
              >
                Max {sortConfig.key === 'max' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
              >
                Actual
              </th>
              <th
                className="sticky top-0 py-2 pr-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
              >
                Remaining
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBudgets.map((budget) => (
              <tr key={budget._id} className="hover:bg-gray-50">
                <td className="py-2 pl-4 text-left">{budget.name}</td>
                <td className="py-2 pl-4 text-left">{}</td>
                <td className="py-2 pr-4 text-left">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(budget.max)}
                </td>
                <td className="py-2 pl-4 text-left">{}</td>
                <td className="py-2 pl-4 text-left">{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}