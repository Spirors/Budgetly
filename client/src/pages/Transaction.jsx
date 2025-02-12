import { useState, useContext } from 'react';

import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { UserContext } from '../context/UserContext';
import MonthNavbar from '../components/Dashboard/MonthNavbar';
import AddTransaction from '../components/Dashboard/AddTransaction';

export default function Transaction() {
  const { user } = useContext(UserContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <DashboardLayout>
      <div className='grid grid-cols-12 grid-rows-3 align-top gap-4 px-4 pb-4'>
        <div className='row-span-3 col-span-9 rounded border border-stone-300'>
          <MonthNavbar
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          {/* Show Budget */}
        </div>
        <div className='col-span-3 rounded border border-stone-300'>
          {!!user && (<AddTransaction userId={user.id}/>)}
        </div>
      </div>
    </DashboardLayout>
  );
}