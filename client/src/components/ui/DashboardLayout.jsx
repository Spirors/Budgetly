import React from 'react'
import Navbar from './Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div>
      {/* BG */}
      <div className='absolute inset-0 -z-11 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />

      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  )
}
