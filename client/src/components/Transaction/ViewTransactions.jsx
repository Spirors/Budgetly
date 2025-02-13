import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';

export default function ViewTransactions({ month, year }) {
  const { transactions } = useContext(DataContext);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });
    setFilteredTransactions(filtered);
  }, [transactions, month, year]);

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
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
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <div className="overflow-y-auto h-170">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr>
              <th
                className="sticky top-0 py-2 pl-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('budgetName')}
              >
                Budget {sortConfig.key === 'budgetName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 w-30 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('date')}
              >
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 w-60 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('description')}
              >
                Description {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="sticky top-0 py-2 pr-4 w-30 border-b border-stone-300 bg-white cursor-pointer text-left"
                onClick={() => requestSort('amount')}
              >
                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction._id}>
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
                <td className="py-2 pr-4 text-left">${transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}