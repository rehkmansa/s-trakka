import { PAGE_LIMIT } from '~/constants/api';
import { lowercase, mockRequest } from '~/lib/utils/helpers';
import { MOCK_TOKENS } from '~/mock/data';
import { Maybe } from '~/types/global';

export interface GetTokensParams {
  offset?: number;
  limit?: number;
  search?: string;
}

const searchTokens = (query: Maybe<string>) => {
  if (!query) return MOCK_TOKENS;

  const q = lowercase(query);
  const filtered = MOCK_TOKENS.filter((t) => {
    const matchesWallet = lowercase(t.address).includes(q);
    const matchesSearch = lowercase(t.symbol).includes(q);

    return matchesSearch || matchesWallet;
  });

  return filtered;
};

export const getTokens = async (params?: GetTokensParams) => {
  const { limit = PAGE_LIMIT, offset = 0, search } = params ?? {};

  await mockRequest(search || offset ? 200 : undefined);

  const filteredTokens = searchTokens(search);

  if (!search) return { data: filteredTokens, left: 0 };

  const tokens = filteredTokens.slice(offset, offset + limit);
  const left = Math.max(0, filteredTokens.length - (offset + limit));

  return { data: tokens, left };
};
