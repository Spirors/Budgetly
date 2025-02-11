import { useState, useContext } from 'react';

import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { UserContext } from '../context/UserContext';
import MonthNavbar from '../components/Dashboard/MonthNavbar';

export default function Transaction() {
  const { user } = useContext(UserContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleAddTransaction = () => {
    // Logic to add a new category
    console.log('Add Category button clicked');
  };

  return (
    <DashboardLayout>
      <div className='grid grid-cols-10 items-center gap-10 '>
        <div className='col-span-8'>
          <MonthNavbar
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
        <div className='col-span-2'>
          <button
            onClick={handleAddTransaction}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Transaction
          </button>
        </div>
      </div>
      <div className="p-4">
      </div>
    </DashboardLayout>
  );
}