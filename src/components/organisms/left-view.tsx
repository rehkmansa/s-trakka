import { LeftViewBalanceTable } from '~/components/molecules/left-view/balance-table';
import { LeftViewProfile } from '~/components/molecules/left-view/profile';

export const LeftView = () => (
  <div className="w-full max-w-[592px] space-y-2.5">
    <LeftViewProfile />
    <LeftViewBalanceTable />
  </div>
);
