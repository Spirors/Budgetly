import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="text-stone-950 bg-stone-100 h-screen">
      <div className="grid gap-4 p-4 grid-cols-[220px_auto]">
        <Sidebar />
        <div className="bg-white rounded-lg shadow">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}