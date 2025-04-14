import { useState } from 'react';
import { HoldingsTokenTable } from '~/components/molecules/holdings-token-table';
import { Searchbar } from '~/components/molecules/searchbar';
import { useGetTokens } from '~/lib/api/hooks/use-get-tokens';
import { cn } from '~/lib/utils/helpers';

export const HoldingsTable = () => {
  const [offset, setOffset] = useState(0);
  const { data: tokens } = useGetTokens(offset);

  return (
    <div
      className={cn(
        'bg-component-bg border border-component-outlines rounded-component',
        'flex-1 flex flex-col'
      )}
    >
      <div className="shrink-0">
        <div className="py-15px border-b border-chart-lines h-14 flex items-center justify-center shrink-0">
          <h3 className="uppercase font-medium text-xl text-center">Holdings</h3>
        </div>
        <div className="px-3">
          <Searchbar iconClassName="text-base-text" wrapperClassName="py-15px" />
        </div>
      </div>
      {tokens ? <HoldingsTokenTable data={tokens} /> : <>Loading...</>}
    </div>
  );
};
