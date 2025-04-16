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
  ScriptableScaleContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BASE_RED, BASE_TEXT } from '~/constants/colors';
import { useGetGraphDataset } from '~/hooks/use-get-graph-dataset';

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

const labels: string[] = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);

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

const SVGBackground = () => (
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
      fill="currentColor"
      stroke="currentColor"
      className="stroke-component-outlines fill-component-bg"
      strokeWidth={0.5}
    />
  </svg>
);

export const TokenStrengthChart: React.FC = () => {
  const datasets = useGetGraphDataset();

  return (
    <div className="relative w-full py-3.5 shrink-0 h-[367px] px-10">
      <SVGBackground />
      <div className="w-full h-full relative">
        <Line data={{ labels, datasets }} options={options} />
      </div>
    </div>
  );
};
