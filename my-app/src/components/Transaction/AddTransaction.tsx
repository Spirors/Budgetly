import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUserContext } from '@/context/UserContext';
import { useDataContext } from '@/context/DataContext';

interface TransactionFormData {
  budgetName: string;
  date: string;
  description: string;
  amount: string;
}

export default function AddTransaction() {
  const { user } = useUserContext();
  const { budgets, fetchBudgets, fetchTransactions } = useDataContext();
  const today = new Date().toLocaleDateString('en-CA');

  const [data, setData] = useState<TransactionFormData>({
    budgetName: 'Uncategorized',
    date: today,
    description: '',
    amount: '',
  });

  const sortedBudgets = budgets
    .filter((budget) => budget.name !== 'Uncategorized')
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to add a transaction.');
      return;
    }
    if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          budgetName: data.budgetName,
          date: data.date,
          description: data.description,
          amount: Number(data.amount),
        }),
      });
      const result = await res.json();
      if (!res.ok || result.error) {
        toast.error(result.error || 'Failed to add transaction.');
        return;
      }
      toast.success('Transaction added successfully!');
      setData({ budgetName: 'Uncategorized', date: today, description: '', amount: '' });
      fetchBudgets();
      fetchTransactions();
    } catch (err) {
      toast.error('An error occurred while adding the transaction.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleAddTransaction} className="space-y-6 bg-white p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Budget Name:</label>
        <select
          value={data.budgetName}
          onChange={(e) => setData({ ...data, budgetName: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="Uncategorized">Uncategorized</option>
          {sortedBudgets.map((budget) => (
            <option key={budget.id} value={budget.name}>
              {budget.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date:</label>
        <input
          type="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <input
          type="text"
          value={data.description}
          placeholder="Optional"
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount:</label>
        <input
          type="number"
          min="0.00"
          step="0.01"
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add Transaction
      </button>
    </form>
  );
}