"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiList, FiPieChart, FiX, FiMenu } from "react-icons/fi";

/**
 * Sidebar.tsx
 * 
 * Renders the main navigation sidebar for the dashboard.
 * Handles navigation between dashboard sections and responsive sidebar toggling.
 */

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavItem = ({ icon: Icon, title, path }: { icon: any, title: string, path: string }) => (
    <button
      onClick={() => {
        router.push(path);
        setMobileOpen(false);
      }}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all w-full ${
        pathname === path 
          ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="text-lg" />
      <span>{title}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg z-20"
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200
        shadow-lg md:shadow-none transform transition-transform duration-300 ease-in-out z-10
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 p-2">
          <img src="/logo-512x512.png" alt="Budgetly Logo" className="h-12 w-12 rounded-full" />

            <h1 className="text-xl font-bold text-gray-800">Budgetly</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-4 mt-2">
            <NavItem icon={FiHome} title="Dashboard" path="/dashboard" />
            <NavItem icon={FiPieChart} title="Budgets" path="/dashboard/budgets" />
            <NavItem icon={FiList} title="Transactions" path="/dashboard/transactions" />
          </nav>

          {/* User & Settings would go here */}
        </div>
      </aside>
    </>
  );
}