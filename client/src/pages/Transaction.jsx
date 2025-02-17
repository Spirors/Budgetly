import { useState, useContext } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { UserContext } from '../context/UserContext';
import MonthNavbar from '../components/Dashboard/MonthNavbar';
import AddTransaction from '../components/Transaction/AddTransaction';
import ViewTransactions from '../components/Transaction/ViewTransactions';

export default function Transaction() {
  const { user } = useContext(UserContext);
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
          <ViewTransactions month={selectedMonth} year={selectedYear} />
        </div>
        <div className='col-span-3 rounded border border-stone-300 h-115'>
          <AddTransaction />
        </div>
      </div>
    </DashboardLayout>
  );
}