import React, { useCallback, useMemo, useState } from 'react';
import { SelectedToken, TokenMap, TokenStoreContext } from '~/context/selected-token/context';

export const TokenStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const value = useMemo(
    () => ({
      tokens,
      addToken,
      bulkAddTokens,
      getToken,
    }),
    [tokens, addToken, bulkAddTokens, getToken]
  );

  return <TokenStoreContext.Provider value={value}>{children}</TokenStoreContext.Provider>;
};
