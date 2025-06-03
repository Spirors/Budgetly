import { useUserContext } from '@/context/UserContext';
import { useState, useRef, useEffect } from 'react';

export default function AccountToggle() {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="User account"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <img
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Chase"
            alt="User avatar"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow"
            width={32}
            height={32}
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        {user && (
          <div className="hidden md:block text-left">
            <span className="text-sm font-medium block text-gray-800">{user.email.split('@')[0]}</span>
            <span className="text-xs block text-gray-500 truncate max-w-[120px]">{user.email}</span>
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
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100">Sign out</a>
          </div>
        </div>
      )}
    </div>
  );
}