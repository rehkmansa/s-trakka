import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { SelectedToken, TokenMap, TokenStoreContext } from '~/context/selected-token/context';

export const TokenStoreProvider = ({ children }: PropsWithChildren) => {
  const [tokens, setTokens] = useState<TokenMap>({});

  const addToken = useCallback((token: SelectedToken) => {
    setTokens((prev) => ({ ...prev, [token.id]: token }));
  }, []);

  const bulkAddTokens = useCallback((list: SelectedToken[]) => {
    setTokens((prev) => {
      const next = { ...prev };

      list.forEach((token) => {
        next[token.id] = token;
      });

      return next;
    });
  }, []);

  const getToken = useCallback((id: string) => tokens[id], [tokens]);

  const removeToken = useCallback((id: string) => {
    setTokens((prev) => {
      if (!(id in prev)) return prev;

      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const value = useMemo(
    () => ({
      tokens,
      addToken,
      bulkAddTokens,
      getToken,
      removeToken,
    }),
    [tokens, addToken, bulkAddTokens, getToken, removeToken]
  );

  return <TokenStoreContext.Provider value={value}>{children}</TokenStoreContext.Provider>;
};
