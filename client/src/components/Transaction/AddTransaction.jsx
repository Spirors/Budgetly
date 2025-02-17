import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/UserContext';
import { DataContext } from '../../context/DataContext';

export default function AddTransaction() {
  const { user } = useContext(UserContext);
  const { budgets, fetchBudgets, fetchTransactions } = useContext(DataContext);

  // Get today's date in the user's local time zone and format it as YYYY-MM-DD
  const today = new Date().toLocaleDateString('en-CA'); // 'en-CA' ensures YYYY-MM-DD format

  // Sort budgets alphabetically by name and filter out "Uncategorized"
  const sortedBudgets = budgets
    .filter((budget) => budget.name !== 'Uncategorized')
    .sort((a, b) => a.name.localeCompare(b.name));

  const [data, setData] = useState({
    budgetName: 'Uncategorized',
    date: today, // Local date in YYYY-MM-DD format
    description: '',
    amount: '',
  });

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const { budgetName, date, description, amount } = data;

    // Convert the local date to UTC
    const localDate = new Date(date);
    const utcDate = localDate.toISOString(); // Convert to UTC

    try {
      const { data: response } = await axios.post('/data/addTransaction', {
        userId: user.id,
        budgetName,
        date: utcDate, // Send UTC date to the backend
        description,
        amount,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({ budgetName: 'Uncategorized', date: today, description: '', amount: '' });
        fetchBudgets();
        fetchTransactions();
        toast.success('Transaction added successfully!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to add transaction');
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
            <option key={budget._id} value={budget.name}>
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