import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUserContext } from '@/context/UserContext';
import { useDataContext } from '@/context/DataContext';
import { supabase } from '@/utils/supabase';

/**
 * AddTransaction.tsx
 * 
 * Provides a form for adding a new transaction.
 * Handles form state, validation, and submission to Supabase.
 * Notifies parent on successful addition and refreshes data.
 */

interface TransactionFormData {
  budgetName: string;
  date: string;
  description: string;
  amount: string;
}

interface AddTransactionProps {
  onClose?: () => void;
}

export default function AddTransaction({ onClose }: AddTransactionProps) {
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

    // Find the selected budget's id
    const selectedBudget = budgets.find((b) => b.name === data.budgetName);
    const budgetId = selectedBudget ? selectedBudget.id : null;

    try {
      const { error } = await supabase.from('transactions').insert([
        {
          user_id: user.id,
          budget_id: budgetId,
          budget_name: data.budgetName,
          date: data.date,
          description: data.description,
          amount: Number(data.amount),
        },
      ]);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success('Transaction added successfully!');
      setData({ budgetName: 'Uncategorized', date: today, description: '', amount: '' });
      fetchBudgets();
      fetchTransactions();
      onClose?.();
    } catch (err) {
      toast.error('An error occurred while adding the transaction.');
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Add New Transaction</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleAddTransaction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Category</label>
          <select
            value={data.budgetName}
            onChange={(e) => setData({ ...data, budgetName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <input
            type="text"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Grocery shopping at Walmart"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              min="0.00"
              step="0.01"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}