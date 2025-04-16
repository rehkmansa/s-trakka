import { useState } from 'react';
import {
  HoldingsTokenTable,
  HoldingsTokenTableLoader,
} from '~/components/molecules/holdings-token-table';
import { Searchbar } from '~/components/molecules/searchbar';
import { PAGE_LIMIT } from '~/constants/api';
import { useDebouncedSearch } from '~/hooks/use-debounced-search';
import { useGetTokens } from '~/lib/api/hooks/use-get-tokens';
import { cn } from '~/lib/utils/helpers';

export const AccountHoldings = () => {
  const [offset, setOffset] = useState(0);
  const { value, debouncedValue, setValue } = useDebouncedSearch('');
  const { data: tokens, isFetchingMore, loading } = useGetTokens(offset, debouncedValue);

  return (
    <div
      className={cn(
        'bg-component-bg border border-component-outlines rounded-component',
        'flex-1 flex flex-col overflow-auto'
      )}
    >
      <div className="shrink-0">
        <div className="py-15px border-b border-chart-lines h-14 flex items-center justify-center shrink-0">
          <h3 className="uppercase font-medium text-xl text-center">Holdings</h3>
        </div>
        <div className="px-3">
          <Searchbar
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOffset(0); // Clear all offsets.;
            }}
            iconClassName="text-base-text"
            wrapperClassName="py-15px"
          />
        </div>
      </div>
      {tokens ? (
        <HoldingsTokenTable
          hasMore={tokens.left > 0}
          onLoadMore={() => setOffset(offset + PAGE_LIMIT)}
          data={tokens.data}
          isFetchingMore={loading || isFetchingMore}
          offset={offset}
          search={debouncedValue}
        />
      ) : (
        <div className="flex-1 overflow-y-hidden">
          <HoldingsTokenTableLoader rows={15} />
        </div>
      )}
    </div>
  );
};
