import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'

import { UserContext } from '../../context/UserContext';
import { DataContext } from '../../context/DataContext';

export default function AddBudget() {
  const { user } = useContext(UserContext);
  const { fetchBudgets, fetchTransactions } = useContext(DataContext);

  const [data, setData] = useState({
    name: '',
    max: '',
  })

  const handleAddBudget = async (e) => {
    e.preventDefault()
    const { name, max } = data;
    try {
      const {data} = await axios.post('/data/addBudget', {userId: user.id, name, max})
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({ name: '', max: '' });
        fetchBudgets();
        fetchTransactions();
        toast.success('Budget added successfully!');
      }
    } catch (error) {
      console.log(error)
    }
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