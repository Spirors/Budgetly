import React from 'react';

export default function Header({ title, children }) {
  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='flex justify-between max-w-7xl h-20 mx-auto py-4 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-white'>{title}</h1>
        <div>
          {children}
        </div>
			</div>
		</header>
  );
}