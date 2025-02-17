import { useState, useContext } from 'react';

import DashboardLayout from '../components/Dashboard/DashboardLayout';
import MonthNavbar from '../components/Dashboard/MonthNavbar';
import AddBudget from '../components/Budget/AddBudget';
import ViewBudgets from '../components/Budget/ViewBudgets';

export default function Budget() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <DashboardLayout>
      <div className='grid grid-cols-12 gap-4 px-4 pb-4'>
        <div className='col-span-9 rounded border border-stone-300 h-215'>
          <MonthNavbar
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <ViewBudgets month={selectedMonth} year={selectedYear}/>
        </div>
        <div className='col-span-3 rounded border border-stone-300 h-70'>
          <AddBudget />
        </div>
      </div>
    </DashboardLayout>
  );
}