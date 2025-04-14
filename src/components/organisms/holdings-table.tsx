import { useState } from 'react';
import { HoldingsTokenTable } from '~/components/molecules/holdings-token-table';
import { Searchbar } from '~/components/molecules/searchbar';
import { useGetTokens } from '~/lib/api/hooks/use-get-tokens';

export const HoldingsTable = () => {
  const [offset, setOffset] = useState(0);
  const { data: tokens } = useGetTokens(offset);

  return (
    <div className="bg-component-bg border border-component-outlines rounded-component">
      <div className="py-15px border-b border-chart-lines h-14 flex items-center justify-center">
        <h3 className="uppercase font-medium text-xl text-center">Holdings</h3>
      </div>
      <div>
        <div className="py-15px px-3">
          <Searchbar iconClassName="text-base-text" />
        </div>
        {tokens ? <HoldingsTokenTable data={tokens} /> : <>Loading...</>}
      </div>
    </div>
  );
};
