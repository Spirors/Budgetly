import { useDataContext } from '@/context/DataContext';

interface StatCardsProps {
  selectedMonth: number;
  selectedYear: number;
}

export default function StatCards({ selectedMonth, selectedYear }: StatCardsProps) {
  const { budgets, transactions } = useDataContext();

  // Calculate total budget for the selected month/year
  const totalBudget = budgets.reduce((sum, b) => sum + (b.max || 0), 0);

  // Calculate total spent for the selected month/year
  const totalSpent = transactions
    .filter(tx => {
      const date = new Date(tx.date);
      return (
        date.getUTCMonth() === selectedMonth &&
        date.getUTCFullYear() === selectedYear
      );
    })
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const remaining = totalBudget - totalSpent;
  const savingsRate = totalBudget > 0 ? Math.max(0, Math.round(((remaining) / totalBudget) * 100)) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Budget</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Spent</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-red-100 text-red-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Remaining</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">${remaining.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Savings Rate</p>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{savingsRate}%</p>
          </div>
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}