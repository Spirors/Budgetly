import React from 'react';
import Navbar from './Navbar';
import Header from './Header';

export default function DashboardLayout({ headerTitle, headerChildren, children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />
      <div className="flex-grow">
        <Header title={headerTitle}>
          {headerChildren}
        </Header>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}