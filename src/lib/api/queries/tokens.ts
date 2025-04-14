import { PAGE_LIMIT } from '~/constants/api';
import { mockRequest } from '~/lib/utils/helpers';
import { MOCK_TOKENS } from '~/mock/data';

export interface GetTokensParams {
  offset?: number;
  limit?: number;
}

export const getTokens = async (params?: GetTokensParams) => {
  const { limit = PAGE_LIMIT, offset = 0 } = params ?? {};
  await mockRequest();

  const tokens = MOCK_TOKENS.slice(offset, limit);

  return tokens;
};
