import TopNavAvatar from '~/assets/top-nav-avatar.png';
import LeftViewAvatar from '~/assets/profile-avatar.webp';
import { TraderProfileRow } from '~/types/global';

export const MOCK_TOP_BAR_PROFILE = {
  name: 'Übermendes',
  walletAddress: '0xuberM',
  src: TopNavAvatar,
};

export const MOCK_LEFT_PROFILE = {
  name: 'NRv_',
  walletAddress: '0x1EFEcb61A2f80Aa34d3b9218B564a64D05946290',
  src: LeftViewAvatar,
};

export const MOCK_TRADER_PROFILE_INFO: TraderProfileRow[] = [
  { label: 'Balance', value: 22.215, type: 'amount' },
  { label: 'Est. Value', value: 23.5435, type: 'amount' },
  { label: 'P&L', value: '???', type: 'progression' },
  { label: 'U P&L', value: '???', type: 'progression' },
];
