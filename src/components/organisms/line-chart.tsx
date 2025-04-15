import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ScriptableScaleContext,
  ChartDataset,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { COLORS } from '~/constants/colors';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Title,
  Tooltip,
  Legend
);

const lineColors = ['#00ff99', '#a25ed2', '#f95200'];

const BASE_TEXT = COLORS['base-text'];
const BASE_RED = COLORS['base-red'];

const labels: string[] = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);

const baseLineStyles: Omit<ChartDataset<'line'>, 'data'> = {
  borderWidth: 2,
  pointBackgroundColor: BASE_TEXT,
  pointRadius: (ctx) => (ctx.dataIndex === ctx.dataset.data.length - 1 ? 6 : 0),
  pointBorderColor: (ctx) =>
    ctx.dataIndex === ctx.dataset.data.length - 1 ? BASE_TEXT : 'transparent',
  pointBorderWidth: (ctx) => (ctx.dataIndex === ctx.dataset.data.length - 1 ? 2 : 0),
  tension: 0.4,
};

const datasets: ChartDataset<'line'>[] = [
  {
    label: 'Token B',
    data: [5, 8, 12, 10, 9, 11, 10, 13, 15, 17, 20, 22],
    borderColor: lineColors[0],
    ...baseLineStyles,
  },
  {
    label: 'Token B',
    data: [-10, 5, 35, 30, 25, 40, 15, 10, 30, 40, 25, 35],
    borderColor: lineColors[1],
    ...baseLineStyles,
  },
  {
    label: 'Token C',
    data: [-30, -10, 5, 10, -5, -10, 5, 10, 15, 20, 10, -5],
    borderColor: lineColors[2],
    ...baseLineStyles,
  },
];

const data: ChartData<'line'> = {
  labels,
  datasets,
};

const getGridColor = (ctx: ScriptableScaleContext) => {
  const v = ctx.tick.value;
  if (v < 0) return BASE_RED;
  return BASE_TEXT;
};

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    title: {
      display: true,
      text: 'TOKEN STRENGTH CHART',
      color: BASE_TEXT,
      font: { size: 20, family: 'Heebo', weight: 500 },
      padding: 27,
    },
  },
  scales: {
    x: { display: false },
    y: {
      border: {
        dash: [1, 1],
        dashOffset: 3,
      },
      ticks: { color: getGridColor },
      grid: {
        color: getGridColor,
        drawTicks: false,
      },
    },
  },
};

export const TokenStrengthChart: React.FC = () => {
  return (
    <div className="relative w-full py-3.5 bg-component-bg shrink-0 h-[467px] px-10">
      <svg
        width={1303}
        height={467}
        viewBox="0 0 1303 467"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M.25 5A4.75 4.75 0 015 .25h1249.44c1.26 0 2.46.493 3.35 1.373l43.55 43.087c.9.892 1.41 2.108 1.41 3.377V462c0 2.623-2.13 4.75-4.75 4.75H47.039a4.748 4.748 0 01-3.322-1.355l-21.54-21.072-.002-.002L1.64 423.788a4.75 4.75 0 01-1.391-3.359V5z"
          fill="transparent"
          className="stroke-component-outlines"
          stroke="currentColor"
          strokeWidth={0.5}
        />
      </svg>
      <div className="w-full h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
