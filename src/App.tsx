import { BaseLayout } from '~/components/layout/base-layout';
import { TokenStoreProvider } from '~/context/selected-token/provider';
import { HomePage } from '~/pages/home';

export const App = () => (
  <TokenStoreProvider>
    <BaseLayout>
      <HomePage />
    </BaseLayout>
  </TokenStoreProvider>
);
