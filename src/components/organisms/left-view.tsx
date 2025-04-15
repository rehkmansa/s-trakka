import { LeftViewBalanceTable } from '~/components/molecules/left-view/balance-table';
import { LeftViewProfile } from '~/components/molecules/left-view/profile';
import { HoldingsTable } from '~/components/organisms/holdings-table';

export const LeftView = () => (
  <div className="w-full max-w-[592px] gap-y-2.5 flex-1 h-full flex flex-col overflow-hidden">
    <LeftViewProfile />
    <LeftViewBalanceTable />
    {/* <div className="h-full bg-amber-300 overflow-y-auto">
      <p className="h-screen"></p>
    </div> */}
    <HoldingsTable />
  </div>
);
