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
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'descending' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const matchesDate = (
        transactionDate.getUTCMonth() === month &&
        transactionDate.getUTCFullYear() === year
      );
      const matchesSearch = (
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.budgetName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesDate && (searchTerm === '' || matchesSearch);
    });
  }, [transactions, month, year, searchTerm]);

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
    // TODO: Implement transaction removal
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Transaction List</h2>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'No matching transactions found' : 'No transactions for this period'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('date')}>
                    <div className="flex items-center">
                      Date
                      <span className="ml-1">
                        {sortConfig.key === 'date' ? (
                          sortConfig.direction === 'ascending' ? '↑' : '↓'
                        ) : '↕'}
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('description')}>
                    <div className="flex items-center">
                      Description
                      <span className="ml-1">
                        {sortConfig.key === 'description' ? (
                          sortConfig.direction === 'ascending' ? '↑' : '↓'
                        ) : '↕'}
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('budgetName')}>
                    <div className="flex items-center">
                      Category
                      <span className="ml-1">
                        {sortConfig.key === 'budgetName' ? (
                          sortConfig.direction === 'ascending' ? '↑' : '↓'
                        ) : '↕'}
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('amount')}>
                    <div className="flex items-center justify-end">
                      Amount
                      <span className="ml-1">
                        {sortConfig.key === 'amount' ? (
                          sortConfig.direction === 'ascending' ? '↑' : '↓'
                        ) : '↕'}
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {transaction.description || 'No description'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.budgetName === 'Uncategorized' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {transaction.budgetName}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-gray-900'
                    }">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(transaction.amount)}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => removeTransaction(transaction.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}