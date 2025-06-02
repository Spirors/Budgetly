"use client"

import React from 'react';
import Header from '@/components/Dashboard/Header';
import Sidebar from '@/components/Dashboard/Sidebar';

// This is the layout for the dashboard, which includes the sidebar and header.
// It wraps around the children components that will be rendered in the dashboard pages.
// The layout is styled with Tailwind CSS classes for a consistent look and feel.
// The layout is responsive and adapts to different screen sizes, ensuring a good user experience across devices.
// The layout is designed to be reusable across different pages in the dashboard, promoting code reusability and maintainability.

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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