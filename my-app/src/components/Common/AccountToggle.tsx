import { useUserContext } from '@/context/UserContext';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/**
 * AccountToggle.tsx
 *
 * Renders a user account toggle button with a dropdown menu.
 * Displays user avatar, username, and email.
 * Allows users to sign out and closes the dropdown when clicking outside.
 */

export default function AccountToggle() {
  const { user, setUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="User account"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow overflow-hidden"
          style={{ position: "relative" }}
        >
          <Image
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Chase"
            alt="User avatar"
            width={32}
            height={32}
            priority
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        {user && (
          <div className="hidden md:block text-left m-2">
            <span className="text-sm font-medium block text-gray-800">{user.username}</span>
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <p className="font-medium">Signed in as</p>
              <p className="truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}