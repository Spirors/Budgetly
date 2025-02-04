import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 text-white flex flex-col shadow-lg justify-center items-center" style={{ backgroundColor: '#295953' }}>
      <div className="p-8 mb-30 text-4xl font-bold" style={{ color: '#5f928b' }}>
        Budgetly
      </div>
      <nav className="flex-grow text-center text-2xl">
        <ul>
          <li className="relative mb-20 flex items-start">
            <Link to="/dashboard" className={`hover:text-yellow-200 hover:underline underline-offset-8 ${isActive('/dashboard') ? 'text-yellow-200 underline underline-offset-8' : ''}`}>
              Dashboard
            </Link>
          </li>

          <li className="relative mb-20">
            <Link to="/dashboard/budget" className={`hover:text-yellow-200 hover:underline underline-offset-8 ${isActive('/dashboard/budget') ? 'text-yellow-200 underline underline-offset-8' : ''}`}>
              Budget
            </Link>
          </li>
          <li className="relative mb-20">
            <Link to="/dashboard/expense" className={`hover:text-yellow-200 hover:underline underline-offset-8 ${isActive('/dashboard/expense') ? 'text-yellow-200 underline underline-offset-8' : ''}`}>
              Expense
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}