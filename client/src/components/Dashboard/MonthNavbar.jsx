import React, { useState } from 'react';

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

export default function MonthNavbar({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) {
  return (
    <div className="flex items-center justify-between rounded m-4">
      <div className="flex space-x-4">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(index)}
            className={`px-2 py-1 ${selectedMonth === index ? 'border-b font-semibold' : 'bg-white text-gray-700'}`}
          >
            {month}
          </button>
        ))}
      </div>
      <div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border border-gray-200 rounded bg-white"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}