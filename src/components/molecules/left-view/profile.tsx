import { ProfileInfo } from '~/components/molecules/profile-info';
import { formatWalletAddress } from '~/lib/utils/helpers';
import { MOCK_LEFT_PROFILE } from '~/mock/data';

export const LeftViewProfile = () => (
  <div className="relative w-full px-5 py-3.5 bg-component-bg shrink-0">
    <svg
      viewBox="0 0 592 121"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <path
        d="M0.5 5C0.5 2.51472 2.51472 0.5 5 0.5H587C589.485 0.5 591.5 2.51472 591.5 5V95.5C591.5 97.9853 589.485 100 587 100H521.874C520.545 100 519.261 100.481 518.259 101.355L497.584 119.391C496.764 120.106 495.713 120.5 494.626 120.5H5C2.51472 120.5 0.5 118.485 0.5 116V5Z"
        fill="transparent"
        className="stroke-component-outlines"
        stroke="currentColor"
      />
    </svg>

    <ProfileInfo
      allowCopy
      {...MOCK_LEFT_PROFILE}
      walletAddress={formatWalletAddress(MOCK_LEFT_PROFILE.walletAddress)}
    />
  </div>
);
