import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDataContext } from '@/context/DataContext';

/**
 * BudgetBreakdownChart.tsx
 * 
 * Renders a pie chart showing budget breakdown for the selected month and year.
 * Calculates totals for each budget category from transactions.
 */

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  selectedMonth: number;
  selectedYear: number;
}

export default function BudgetBreakdownChart({ selectedMonth, selectedYear }: Props) {
  const { transactions } = useDataContext();

  const categoryTotals: { [category: string]: number } = {};
  transactions.forEach(tx => {
    const date = new Date(tx.date);
    if (date.getUTCMonth() === selectedMonth && date.getUTCFullYear() === selectedYear) {
      categoryTotals[tx.budgetName] = (categoryTotals[tx.budgetName] || 0) + Math.abs(tx.amount);
    }
  });

  const pieLabels = Object.keys(categoryTotals);
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieLabels.map(label => categoryTotals[label]),
        backgroundColor: [
          '#34d399', '#60a5fa', '#fbbf24', '#a78bfa', '#f472b6', '#f87171', '#38bdf8', '#facc15', '#4ade80', '#818cf8',
          '#fb7185', '#fcd34d', '#a3e635', '#f472b6', '#f59e42'
        ],
      },
    ],
  };

  return (
  <Pie
      data={pieData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 20, font: { size: 14 } } }
        }
      }}
    />
  );
}