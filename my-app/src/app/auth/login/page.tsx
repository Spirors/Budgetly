"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import { supabase } from '@/utils/supabase';
import { motion } from 'framer-motion';

/**
 * Login.tsx
 * 
 * Provides a form for user login.
 * Handles user input, validation, and submission to Supabase Auth.
 * Displays success or error messages based on the outcome.
 */

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = data;

    const { error, data: signInData } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    setUser({
      id: signInData.user.id,
      email: signInData.user.email ?? '',
      username: signInData.user.user_metadata?.username ?? '',
    });
    
    toast.success('Logged in successfully!');
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <>
      <motion.h1 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"
      >
        Welcome Back
      </motion.h1>
      
      <form onSubmit={loginUser} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
          transition={{ delay: 0.3 }}
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
            autoComplete="current-password"
            minLength={6}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
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
                Logging in...
              </span>
            ) : 'Login'}
          </button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-center text-gray-500"
        >
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Navigate to signup page"
          >
            Sign up here
          </Link>
        </motion.p>
      </form>
    </>
  );
}