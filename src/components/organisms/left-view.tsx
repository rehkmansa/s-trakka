import { SideViewWrapper } from '~/components/atoms/side-view-wrapper';
import { LeftViewBalanceTable } from '~/components/molecules/left-view/balance-table';
import { LeftViewProfile } from '~/components/molecules/left-view/profile';
import { HoldingsTable } from '~/components/organisms/holdings-table';

export const LeftView = () => (
  <SideViewWrapper className="max-w-[592px]">
    <LeftViewProfile />
    <LeftViewBalanceTable />
    <HoldingsTable />
  </SideViewWrapper>
);
