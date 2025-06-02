import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUserContext } from '@/context/UserContext';
import { useDataContext } from '@/context/DataContext';

interface BudgetFormData {
  name: string;
  max: string;
}

export default function AddBudget() {
  const { user } = useUserContext();
  const { fetchBudgets, fetchTransactions } = useDataContext();

  const [data, setData] = useState<BudgetFormData>({
    name: '',
    max: '',
  });

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, max } = data;

    if (!user) {
      toast.error('You must be logged in to add a budget.');
      return;
    }
    if (!name.trim()) {
      toast.error('Budget name is required.');
      return;
    }
    if (!max || isNaN(Number(max)) || Number(max) <= 0) {
      toast.error('Please enter a valid max amount.');
      return;
    }

    // Prepare budget data
  };

  return (
    <form onSubmit={handleAddBudget} className="space-y-6 bg-white p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Max:</label>
        <input
          type="number"
          value={data.max}
          onChange={(e) => setData({ ...data, max: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add Budget
      </button>
    </form>
  );
}