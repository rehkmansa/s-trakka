import { SideViewWrapper } from '~/components/atoms/side-view-wrapper';
import { TokenStrengthChart } from '~/components/organisms/line-chart';
import { LiveTokenActivity } from '~/components/organisms/live-token-activity';

export const RightView = () => {
  return (
    <SideViewWrapper>
      <TokenStrengthChart />
      <LiveTokenActivity />
    </SideViewWrapper>
  );
};
