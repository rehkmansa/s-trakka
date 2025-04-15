import { SideViewWrapper } from '~/components/atoms/side-view-wrapper';
import { TokenStrengthChart } from '~/components/organisms/line-chart';

export const RightView = () => {
  return (
    <SideViewWrapper>
      <TokenStrengthChart />
    </SideViewWrapper>
  );
};
