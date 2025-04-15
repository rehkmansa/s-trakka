import { ChartDataset } from 'chart.js';
import { TOKENS_QUERY_KEY } from '~/constants/api';
import { BASE_TEXT, COLORS, convertSelectionVarToKey } from '~/constants/colors';
import { useQueryStore } from '~/context/query-store';
import { useSelectedTokenStore } from '~/context/selected-token';
import { generateGraphPoints } from '~/lib/utils/generate-graph-points';
import { assignSelectionColor, parseSelectedTokens } from '~/lib/utils/helpers';

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
  const { queryParams } = useQueryStore();

  const queryTokens = parseSelectedTokens(queryParams[TOKENS_QUERY_KEY]);

  const dataset: ChartDataset<'line'>[] = queryTokens.map((tokenId, idx) => {
    const borderColor = COLORS[convertSelectionVarToKey(assignSelectionColor(idx))];

    return {
      ...baseLineStyles,
      data: generateGraphPoints(Number(tokenId)),
      label: tokens[tokenId]?.name,
      borderColor,
    };
  });

  console.log(dataset);

  return dataset;
};
