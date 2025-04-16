import { SideViewWrapper } from '~/components/atoms/side-view-wrapper';
import { LeftViewBalanceTable } from '~/components/molecules/left-view/balance-table';
import { LeftViewProfile } from '~/components/molecules/left-view/profile';
import { AccountHoldings } from '~/components/organisms/account-holdings';

export const LeftView = () => (
  <SideViewWrapper className="max-w-[592px]">
    <LeftViewProfile />
    <LeftViewBalanceTable />
    <AccountHoldings />
  </SideViewWrapper>
);
