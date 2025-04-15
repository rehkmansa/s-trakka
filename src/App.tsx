import { BaseLayout } from '~/components/layout/base-layout';
import { QueryProvider } from '~/context/query-store';
import { TokenStoreProvider } from '~/context/selected-token';
import { HomePage } from '~/pages/home';

export const App = () => (
  <QueryProvider>
    <TokenStoreProvider>
      <BaseLayout>
        <HomePage />
      </BaseLayout>
    </TokenStoreProvider>
  </QueryProvider>
);
