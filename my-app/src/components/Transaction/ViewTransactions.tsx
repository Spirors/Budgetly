import { useMemo, useState } from 'react';
import { useDataContext } from '@/context/DataContext';

interface ViewTransactionsProps {
  month: number;
  year: number;
}

type SortKey = 'budgetName' | 'date' | 'description' | 'amount';

interface SortConfig {
  key: SortKey;
  direction: 'ascending' | 'descending';
}

export default function ViewTransactions({ month, year }: ViewTransactionsProps) {
  const { transactions } = useDataContext();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'ascending' });

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getUTCMonth() === month &&
        transactionDate.getUTCFullYear() === year
      );
    });
  }, [transactions, month, year]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let valueA: any = sortConfig.key === 'date' ? new Date(a[sortConfig.key]) : a[sortConfig.key];
      let valueB: any = sortConfig.key === 'date' ? new Date(b[sortConfig.key]) : b[sortConfig.key];
      if (valueA < valueB) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredTransactions, sortConfig]);

  const requestSort = (key: SortKey) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }
      return { key, direction: 'ascending' };
    });
  };

  const removeTransaction = async (id: string) => {
    // TODO: Implement transaction removal using DataContext if needed
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
              <th className="sticky top-0 py-2 w-10 border-b border-stone-300 bg-white"> </th>
              <th className="sticky top-0 py-2 pl-4 w-40 border-b border-stone-300 bg-white cursor-pointer text-left" onClick={() => requestSort('budgetName')}>Budget {sortConfig.key === 'budgetName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th className="sticky top-0 py-2 w-30 border-b border-stone-300 bg-white cursor-pointer text-left" onClick={() => requestSort('date')}>Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th className="sticky top-0 py-2 w-60 border-b border-stone-300 bg-white cursor-pointer text-left" onClick={() => requestSort('description')}>Description {sortConfig.key === 'description' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th className="sticky top-0 py-2 pr-4 w-30 border-b border-stone-300 bg-white cursor-pointer text-left" onClick={() => requestSort('amount')}>Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="py-2 w-10 text-center">
                  <button onClick={() => removeTransaction(transaction.id)} className="text-red-500 hover:text-red-700">X</button>
                </td>
                <td className="py-2 pl-4 text-left">{transaction.budgetName}</td>
                <td className="py-2 text-left">{new Date(transaction.date).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                <td className="py-2 text-left">{transaction.description}</td>
                <td className="py-2 pr-4 text-left">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}