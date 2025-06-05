import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUserContext } from '@/context/UserContext';
import { useDataContext } from '@/context/DataContext';
import { supabase } from '@/utils/supabase_temp';

/**
 * AddBudget.tsx
 * 
 * Renders a form for creating a new budget.
 * Handles form state, validation, and submission to Supabase.
 * Notifies parent on successful creation and refreshes budget data.
 */

interface BudgetFormData {
  name: string;
  max: string;
}

interface AddBudgetProps {
  onClose?: () => void;
}

export default function AddBudget({ onClose }: AddBudgetProps) {
  const { user } = useUserContext();
  const { fetchBudgets } = useDataContext();

  const [data, setData] = useState<BudgetFormData>({
    name: '',
    max: '',
  });

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to add a budget.');
      return;
    }
    if (!data.name.trim()) {
      toast.error('Budget name is required.');
      return;
    }
    if (!data.max || isNaN(Number(data.max)) || Number(data.max) <= 0) {
      toast.error('Please enter a valid budget amount.');
      return;
    }

    try {
      const { error } = await supabase.from('budgets').insert([
        {
          user_id: user.id,
          name: data.name.trim(),
          max: Number(data.max),
        },
      ]);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success('Budget created successfully!');
      setData({ name: '', max: '' });
      fetchBudgets();
      onClose?.();
    } catch {
      toast.error('Failed to create budget');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Create New Budget</h3>
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

      <form onSubmit={handleAddBudget} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Groceries, Entertainment"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Amount</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={data.max}
              onChange={(e) => setData({ ...data, max: e.target.value })}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="text-gray-500 sm:text-sm pr-3">USD</span>
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
            Create Budget
          </button>
        </div>
      </form>
    </div>
  );
}