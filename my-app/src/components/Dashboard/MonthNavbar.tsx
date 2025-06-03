interface MonthNavbarProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function MonthNavbar({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear
}: MonthNavbarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-1">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(index)}
                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                  selectedMonth === index
                    ? 'bg-green-600 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {month.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none pl-3 pr-8 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}