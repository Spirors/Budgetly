"use client"

import { useState } from 'react';
import MonthNavbar from '@/components/Dashboard/MonthNavbar';
import AddBudget from '@/components/Budget/AddBudget';
import ViewBudgets from '@/components/Budget/ViewBudgets';

export default function Budgets() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getUTCMonth());
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getUTCFullYear());

  return (
    <div className='grid grid-cols-12 gap-4 px-4 pb-4'>
      <div className='col-span-9 rounded border border-stone-300 min-h-[215px]'>
        <MonthNavbar
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <ViewBudgets month={selectedMonth} year={selectedYear} />
      </div>
      <div className='col-span-3 rounded border border-stone-300 min-h-[70px]'>
        <AddBudget />
      </div>
    </div>
  );
}