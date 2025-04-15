import { ChartDataset } from 'chart.js';
import { BASE_TEXT } from '~/constants/colors';
import { useSelectedTokenStore } from '~/context/selected-token/use-selected-token';
import { generateGraphPoints } from '~/lib/utils/generate-graph-points';

const baseLineStyles: Omit<ChartDataset<'line'>, 'data'> = {
  borderWidth: 2,
  pointBackgroundColor: BASE_TEXT,
  pointRadius: (ctx) => (ctx.dataIndex === ctx.dataset.data.length - 1 ? 6 : 0),
  pointBorderColor: (ctx) =>
    ctx.dataIndex === ctx.dataset.data.length - 1 ? BASE_TEXT : 'transparent',
  pointBorderWidth: (ctx) => (ctx.dataIndex === ctx.dataset.data.length - 1 ? 2 : 0),
  tension: 0.4,
};

export const useGetGraphDataset = () => {
  const { tokens } = useSelectedTokenStore();

  const dataset: ChartDataset<'line'>[] = Object.entries(tokens).map(([tokenId, meta]) => ({
    ...baseLineStyles,
    data: generateGraphPoints(tokenId),
    borderColor: meta.selectionColor,
  }));

  return dataset;
};
