import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <div className="max-w-7xl flex items-center justify-center bg-white rounded-lg shadow-2xl" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22)', minHeight: '600px' }}>
        <img className="hidden md:block md:w-1/2 object-contain mx-25 my-25" src="/img/budgeting.jpg" alt="Budgeting" />
        <div className="w-full md:w-1/2 mx-25 my-25">
          {children}
        </div>
      </div>
    </div>
  );
}