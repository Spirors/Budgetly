import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { toast } from 'react-hot-toast';
import { useDataContext } from '@/context/DataContext';

interface EditBudgetsProps {
  budget: {
    id: string;
    name: string;
    max: number;
  };
  onClose: () => void;
}

export default function EditBudgets({ budget, onClose }: EditBudgetsProps) {
  const { fetchBudgets, fetchTransactions } = useDataContext();
  const [name, setName] = useState(budget.name);
  const [max, setMax] = useState(budget.max.toString());
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Budget name is required.');
      return;
    }
    if (!max || isNaN(Number(max)) || Number(max) <= 0) {
      toast.error('Please enter a valid budget amount.');
      return;
    }
    setIsLoading(true);

    // Update the budget
    const { error } = await supabase
      .from('budgets')
      .update({ name: name.trim(), max: Number(max) })
      .eq('id', budget.id);

    // Debug: check matching transactions
    const { data: matchingTx } = await supabase
      .from('transactions')
      .select('id, budget_id, budget_name')
      .eq('budget_id', budget.id);

    console.log('Matching transactions:', matchingTx);

    // Update all related transactions' budget_name
    const { error: txError } = await supabase
      .from('transactions')
      .update({ budget_name: name.trim() })
      .eq('budget_id', budget.id);

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    if (txError) {
      toast.error(txError.message);
      return;
    }
    toast.success('Budget updated!');
    fetchBudgets();
    fetchTransactions();
    onClose();
  };

  // Modal window (like RemoveBudget)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Edit Budget</h2>
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                value={max}
                min="0.01"
                step="0.01"
                onChange={e => setMax(e.target.value)}
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <span className="text-gray-500 sm:text-sm pr-3">USD</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}