import { createContext } from 'react';
import { SelectionColorKeys } from '~/constants/colors';
import { IsUncertain } from '~/types/global';

export interface SelectedToken {
  id: number;
  address: string;
  selectionColor: SelectionColorKeys;
}

export type TokenMap = Record<string, SelectedToken>;

export interface TokenStoreContextValue {
  tokens: TokenMap;
  addToken: (token: SelectedToken) => void;
  bulkAddTokens: (tokens: SelectedToken[]) => void;
  getToken: (id: string) => IsUncertain<SelectedToken>;
  removeToken: (id: string) => void;
}

export const TokenStoreContext = createContext<IsUncertain<TokenStoreContextValue>>(undefined);
