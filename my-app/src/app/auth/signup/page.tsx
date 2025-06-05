"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase_temp';
import { motion } from 'framer-motion';

/**
 * Signup.tsx
 * 
 * Provides a form for user registration.
 * Handles user input, validation, and submission to Supabase Auth.
 * Displays success or error messages based on the outcome.
 */

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const signupUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success('Account created! Please check your email to verify your account.');
    setIsLoading(false);
    router.push('/auth/login');
  };

  return (
    <>
      <motion.h1 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"
      >
        Create Account
      </motion.h1>
      
      <form onSubmit={signupUser} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            required
            minLength={3}
            maxLength={30}
            pattern="[a-zA-Z0-9]+"
            title="Letters and numbers only"
            autoComplete="username"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            required
            autoComplete="email"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-gray-500">
            Minimum 8 characters
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 ${
              isLoading ? 'opacity-80 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : 'Sign Up'}
          </button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm text-center text-gray-500"
        >
          Already have an account?{' '}
          <Link 
            href="/auth/login" 
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Navigate to login page"
          >
            Login here
          </Link>
        </motion.p>
      </form>
    </>
  );
}