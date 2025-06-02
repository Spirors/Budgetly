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
    <div className="flex items-center justify-between rounded m-4">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(index)}
            className={`px-2 py-1 whitespace-nowrap ${
              selectedMonth === index 
                ? 'border-b-2 border-violet-500 font-semibold text-violet-700' 
                : 'text-gray-700 hover:text-violet-600'
            }`}
          >
            {month.substring(0, 3)}
          </button>
        ))}
      </div>
      <div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 border border-gray-200 rounded bg-white text-sm"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}