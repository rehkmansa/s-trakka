import { useContext } from 'react';
import { TokenStoreContext, TokenStoreContextValue } from '~/context/selected-token/context';

export const useSelectedTokenStore = (): TokenStoreContextValue => {
  const ctx = useContext(TokenStoreContext);
  if (!ctx) {
    throw new Error('useTokenStore must be used within a TokenStoreProvider');
  }
  return ctx;
};
