import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center relative">
      {/* BG */}
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:80px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute inset-0 -z-11 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#17e_100%)]"></div>
      
      <div className="max-w-7xl flex items-center justify-center bg-white rounded-lg shadow-2xl" style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22)', minHeight: '600px' }}>
        <img className="hidden md:block md:w-1/2 object-contain mx-25 my-25" src="/img/budgeting.jpg" alt="Budgeting" />
        <div className="w-full md:w-1/2 mx-25 my-25">
          {children}
        </div>
      </div>
    </div>
  );
}