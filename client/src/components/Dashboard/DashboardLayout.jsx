import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }) {
  return (
    <div className='flex'>
      <div className='shrink-0'>
        <div className="text-stone-950 bg-stone-100 min-w-screen">
          <div className="grid gap-4 grid-cols-[220px_auto]">
            <Sidebar />
            <div className="bg-white rounded-lg shadow m-4">
              <Header />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}