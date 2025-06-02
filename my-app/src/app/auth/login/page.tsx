"use client";

import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = data;
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      <form onSubmit={loginUser} className="space-y-6">
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
            autoComplete="current-password"
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            className="underline text-blue-600 hover:text-blue-800"
            aria-label="Navigate to signup page"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </>
  );
}