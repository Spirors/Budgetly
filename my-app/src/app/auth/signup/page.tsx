"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState<SignupData>({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const signupUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, email, password } = data;

    // Supabase Auth sign up
    const { error, data: signUpData } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
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
      <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
      <form onSubmit={signupUser} className="space-y-6">
        {/* ...existing form fields... */}
        <div>
          <label htmlFor="username" className="block mb-2 text-base font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={3}
            maxLength={30}
            pattern="[a-zA-Z0-9]+"
            title="Letters and numbers only"
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-gray-500">
            Minimum 8 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/auth/login" 
            className="underline text-blue-600 hover:text-blue-800"
            aria-label="Navigate to login page"
          >
            Login here
          </Link>
        </p>
      </form>
    </>
  );
}