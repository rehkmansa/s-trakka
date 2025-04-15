import { createContext, useContext } from 'react';
import { IsUncertain } from '~/types/global';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

export interface SelectedToken {
  id: number;
  name: string;
}

export type TokenMap = Record<string, SelectedToken>;

export interface TokenStoreContextValue {
  tokens: TokenMap;
  addToken: (token: SelectedToken) => void;
  bulkAddTokens: (tokens: SelectedToken[]) => void;
  getToken: (id: string) => IsUncertain<SelectedToken>;
  removeToken: (id: string) => void;
}

const TokenStoreContext = createContext<IsUncertain<TokenStoreContextValue>>(undefined);

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

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedTokenStore = (): TokenStoreContextValue => {
  const ctx = useContext(TokenStoreContext);
  if (!ctx) {
    throw new Error('useTokenStore must be used within a TokenStoreProvider');
  }
  return ctx;
};
