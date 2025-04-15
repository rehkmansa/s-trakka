import { createContext } from 'react';

export interface SelectedToken {
  id: number;
  address: string;
  selectionColor: string;
}

export type TokenMap = Record<string, SelectedToken>;

export interface TokenStoreContextValue {
  tokens: TokenMap;
  addToken: (token: SelectedToken) => void;
  bulkAddTokens: (tokens: SelectedToken[]) => void;
  getToken: (id: string) => SelectedToken | undefined;
}

export const TokenStoreContext = createContext<TokenStoreContextValue | undefined>(undefined);
