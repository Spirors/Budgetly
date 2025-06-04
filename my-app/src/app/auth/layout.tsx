"use client"

import React from 'react';
import { motion } from 'framer-motion';

/**
 * AuthLayout.tsx
 * 
 * Provides a modern, animated layout for authentication pages.
 * Includes a gradient background, logo, and responsive design.
 */

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 mix-blend-overlay"
        />
      </div>

      {/* Modern logo/title */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
          Budgetly
        </h1>
      </motion.div>

      {/* Content with smooth animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="relative h-screen grid grid-cols-1 lg:grid-cols-2"
      >
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-80">
            {children}
          </div>
        </div>
        
        {/* Modern image side */}
        <div className="hidden lg:flex items-center justify-center p-12">
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            style={{ 
              backgroundImage: "url('/budgeting.png')",
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              backgroundBlendMode: 'multiply',
              backgroundColor: 'rgba(79, 70, 229, 0.1)'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}