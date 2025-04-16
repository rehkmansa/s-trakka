import { useQueryStore } from '~/context/query-store';
import { generateTransactions } from '~/mock/generate-transactions';
import { getTokenIdsFromQuery } from '~/lib/utils/helpers';

export const useTokenLiveActivity = () => {
  const { queryParams } = useQueryStore();

  const tokens = getTokenIdsFromQuery(queryParams);

  const tableData = generateTransactions(tokens);

  return tableData;
};
