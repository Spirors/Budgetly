import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useDataContext } from '@/context/DataContext';
import { toast } from 'react-hot-toast';

/**
 * RemoveTransaction.tsx
 *
 * Provides a modal for confirming the deletion of a transaction.
 * Handles the deletion process and notifies the user of success or failure.
 */

interface RemoveTransactionProps {
  transactionId: string;
  onClose: () => void;
  disabled?: boolean;
}

export default function RemoveTransaction({ transactionId, onClose, disabled }: RemoveTransactionProps) {
  const { fetchTransactions } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId);

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Transaction deleted!');
    fetchTransactions();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Delete Transaction</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this transaction? This action cannot be undone.
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