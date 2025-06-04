import { useDataContext } from '@/context/DataContext';

export default function RecentTransactions() {
  const { transactions } = useDataContext();

  const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recent = sorted.slice(0, 5);

  return (
    <div className="space-y-4">
      {recent.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">{tx.description || 'No description'}</p>
              <p className="text-sm text-gray-500">{tx.budgetName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-800">${Math.abs(tx.amount).toFixed(2)}</p>
            <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}