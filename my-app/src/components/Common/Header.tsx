import { FiSearch } from 'react-icons/fi';
import AccountToggle from '@/components/Common/AccountToggle';

/**
 * Header.tsx
 *
 * Renders the header for the application.
 * Displays the app name, current date, and a search bar on larger screens.
 * Shows an account toggle button on mobile view.
 */

export default function Header({ mobileView = false }: { mobileView?: boolean }) {
  const today = new Date();
  
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        {mobileView ? (
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Budgetly</h1>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            <div className="md:hidden"> {/* Only show in mobile */}
              <AccountToggle />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm w-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}