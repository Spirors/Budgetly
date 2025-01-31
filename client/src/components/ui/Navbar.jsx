import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-3xl font-bold">
        Budgetly
      </div>
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/budget" className="hover:text-gray-300">
              Budget
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/expense" className="hover:text-gray-300">
              Expense
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}