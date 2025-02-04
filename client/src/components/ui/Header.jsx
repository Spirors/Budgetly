import React from 'react';

export default function Header({ title, children }) {
  return (
    <div className="bg-green-800/70 text-white p-6 shadow-md flex justify-between items-center h-20 w-full">
      <h1 className="text-2xl font-bold ml-20">{title}</h1>
      {children}
    </div>
  );
}