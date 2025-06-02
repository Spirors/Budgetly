"use client"

import { useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import MonthNavbar from '@/components/Dashboard/MonthNavbar';
import AddTransaction from '@/components/Transaction/AddTransaction';
import ViewTransactions from '@/components/Transaction/ViewTransactions';

export default function Transactions() {
  const { user } = useUserContext();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());

  return (
    <div className='grid grid-cols-12 gap-4 px-4 pb-4'>
      <div className='col-span-9 rounded border border-stone-300 h-[215px]'>
        <MonthNavbar
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <ViewTransactions month={selectedMonth} year={selectedYear} />
      </div>
      <div className='col-span-3 rounded border border-stone-300 h-[115px]'>
        <AddTransaction />
      </div>
    </div>
  );
}