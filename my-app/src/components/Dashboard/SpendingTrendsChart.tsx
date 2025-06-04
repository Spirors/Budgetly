import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { useDataContext } from '@/context/DataContext';

/**
 * SpendingTrendsChart.tsx
 * 
 * Renders a line chart showing spending trends over the last 6 months, current year, or last year.
 * Calculates total spending for each month based on transactions.
 */

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
  selectedYear: number;
  selectedMonth: number;
  range: '6months' | 'year' | 'lastyear';
}

export default function SpendingTrendsChart({ selectedYear, selectedMonth, range }: Props) {
  const { transactions } = useDataContext();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let labels: string[] = [];
  let spending: number[] = [];

  if (range === '6months') {
    // Last 6 months from selectedMonth/selectedYear
    const now = new Date(selectedYear, selectedMonth, 1);
    labels = [];
    spending = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.push(`${months[d.getMonth()]} '${String(d.getFullYear()).slice(-2)}`);
      const total = transactions
        .filter(tx => {
          const txDate = new Date(tx.date);
          return txDate.getUTCMonth() === d.getMonth() && txDate.getUTCFullYear() === d.getFullYear();
        })
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
      spending.push(total);
    }
  } else if (range === 'year') {
    // This year, all months
    labels = months.map((m, idx) => `${m} '${String(selectedYear).slice(-2)}`);
    spending = months.map((_, idx) =>
      transactions
        .filter(tx => {
          const txDate = new Date(tx.date);
          return txDate.getUTCMonth() === idx && txDate.getUTCFullYear() === selectedYear;
        })
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
    );
  } else if (range === 'lastyear') {
    // Last year, all months
    const lastYear = selectedYear - 1;
    labels = months.map((m, idx) => `${m} '${String(lastYear).slice(-2)}`);
    spending = months.map((_, idx) =>
      transactions
        .filter(tx => {
          const txDate = new Date(tx.date);
          return txDate.getUTCMonth() === idx && txDate.getUTCFullYear() === lastYear;
        })
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Spent',
        data: spending,
        fill: false,
        borderColor: '#34d399',
        backgroundColor: '#34d399',
        tension: 0.4,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }}
    />
  );
}