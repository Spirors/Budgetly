import React, { useState } from 'react';
import axios from 'axios';

export default function AddTransaction({ userId }) {
  const [data, setData] = useState({
    description: '',
    amount: '',
    budgetName: '',
  })

  const handleAddTransaction = async (e) => {
    e.preventDefault()
    const { description, amount, budgetName } = data;
    try {
      const {data} = await axios.post('/data/addTransaction', {description, amount, budgetName})
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({ description: '', amount: '', budgetName: '' });
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleAddTransaction} className="space-y-6 bg-white p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount:</label>
        <input
          type="number"
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Budget Name:</label>
        <input
          type="text"
          value={data.budgetName}
          placeholder='Optional'
          onChange={(e) => setData({ ...data, budgetName: e.target.value })}
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