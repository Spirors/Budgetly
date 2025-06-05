import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase_temp';
import { useDataContext } from '@/context/DataContext';
import { toast } from 'react-hot-toast';

/**
 * RemoveBudget.tsx
 *
 * Provides a modal for confirming budget deletion.
 * Handles the removal of a budget and updates related transactions.
 * Notifies parent component on success.
 */

interface RemoveBudgetProps {
  budgetId: string;
  onClose: () => void;
}

export default function RemoveBudget({ budgetId, onClose }: RemoveBudgetProps) {
  const { fetchBudgets, fetchTransactions } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);

  // Show modal immediately when component mounts
  useEffect(() => {
    // No-op, modal is always shown when this component is rendered
  }, []);

  const handleRemove = async () => {
    setIsLoading(true);
    // 1. Set related transactions to Uncategorized BEFORE deleting the budget
    await supabase
      .from('transactions')
      .update({ budget_name: 'Uncategorized' })
      .eq('budget_id', budgetId);

    // 2. Now delete the budget (this will set budget_id to null)
    const { error } = await supabase.from('budgets').delete().eq('id', budgetId);

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Budget deleted!');
    fetchBudgets();
    fetchTransactions();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Delete Budget</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this budget? All related transactions will be moved to <b>Uncategorized</b>.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}