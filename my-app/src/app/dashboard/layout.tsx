"use client"
import React from 'react';
import Header from '@/components/Common/Header';
import Sidebar from '@/components/Common/Sidebar';
import { useUserContext } from '@/context/UserContext';
import Loading from '@/components/Common/Loading';

/**
 * dashboard/layout.tsx
 *
 * Layout component for the dashboard.
 * Provides a consistent header, sidebar, and main content area.
 */

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useUserContext();

  if (loading) {
    return <Loading />;
  }

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