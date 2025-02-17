import React, { useContext, useState, useEffect, useMemo } from 'react';
import { DataContext } from '../../context/DataContext';

export default function ViewTransactions({ month, year }) {
  const { transactions } = useContext(DataContext);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

  console.log('Month:', month);
  console.log('Year:', year);
  console.log('Transactions:', transactions);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
  
    const numericMonth = Number(month); // Ensure these are numbers
    const numericYear = Number(year);
  
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getUTCMonth();
      const transactionYear = transactionDate.getUTCFullYear();
  
      console.log('Transaction Date (UTC):', transactionDate.toISOString());
      console.log('Parsed Month (UTC):', transactionMonth);
      console.log('Parsed Year (UTC):', transactionYear);
      
      return transactionMonth === numericMonth && transactionYear === numericYear;
    });
  }, [transactions, month, year]);
  
  console.log('Filtered Transactions:', filteredTransactions);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      const valueA = sortConfig.key === 'date' ? new Date(a[sortConfig.key]) : a[sortConfig.key];
      const valueB = sortConfig.key === 'date' ? new Date(b[sortConfig.key]) : b[sortConfig.key];

      if (valueA < valueB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTransactions, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (sortedTransactions.length === 0) {
    return (
      <div className='p-6'>
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <p className="text-gray-500">No transactions found for the selected month and year.</p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <div className="overflow-y-auto h-170 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr>
              <th
                className="sticky top-0 py-2 pl-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('budgetName')}
                role="columnheader"
                aria-label="Sort by Budget Name"
              >
                Budget {sortConfig.key === 'budgetName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 w-30 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('date')}
                role="columnheader"
                aria-label="Sort by Date"
              >
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 w-60 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('description')}
                role="columnheader"
                aria-label="Sort by Description"
              >
                Description {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 pr-4 w-30 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('amount')}
                role="columnheader"
                aria-label="Sort by Amount"
              >
                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="py-2 pl-4 text-left">{transaction.budgetName}</td>
                <td className="py-2 text-left">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </td>
                <td className="py-2 text-left">{transaction.description}</td>
                <td className="py-2 pr-4 text-left">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}