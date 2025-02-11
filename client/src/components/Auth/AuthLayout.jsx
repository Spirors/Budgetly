import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_2px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_2px)] bg-[size:5rem_5rem]"></div>
      {/* Title */}
      <div className="absolute top-10 left-20 right-0 h-20">
        <h1 className="text-3xl font-bold text-gray-800">Budgetly</h1>
      </div>
      {/* Content */}
      <div className="h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center relative">
          <div className="w-full md:w-2/5 m-10">
            {children}
          </div>
        </div>
        <div className="hidden md:flex" style={{ backgroundImage: 'url(/img/budgeting.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>
    </>
  );
}
