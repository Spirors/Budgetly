import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

export default function ViewBudgets() {
  const { budgets } = useContext(DataContext);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const sortedBudgets = [...budgets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className='p-6'>
      <h2 className="text-xl font-bold mb-4">Budgets</h2>
      <div className="overflow-y-auto h-170">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr>
              <th
                className="sticky top-0 py-2 pl-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('name')}
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
              >
                Max {sortConfig.key === 'max' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('max')}
              >
                Actual {sortConfig.key === 'max' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 pr-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('max')}
              >
                Remaining {sortConfig.key === 'max' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBudgets.map((budget) => (
              <tr key={budget._id}>
                <td className="py-2 pl-4 text-left">{budget.name}</td>
                <td className="py-2 pl-4 text-left">{}</td>
                <td className="py-2 pr-4 text-left">${budget.max}</td>
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