"use client"
import React from 'react';
import Header from '@/components/Dashboard/Header';
import Sidebar from '@/components/Dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-10">
        <Header mobileView />
      </div>
      
      {/* Sidebar - Hidden on mobile unless toggled */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}