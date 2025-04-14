import { EthIcon } from '~/assets/icons';
import { NeonText } from '~/components/atoms/neon-text';
import { cn } from '~/lib/utils/helpers';
import { MOCK_TRADER_PROFILE_INFO } from '~/mock/data';
import { TraderProfileRow } from '~/types/global';

const Row = ({ label, value, type }: TraderProfileRow) => (
  <div className="flex flex-col gap-[7px]">
    <h4 className="tracking-wider font-extralight">{label}</h4>
    {type == 'amount' && (
      <p className={cn('tracking-wider flex items-center gap-0.5')}>
        {value}
        <EthIcon />
      </p>
    )}

    {type === 'progression' && <NeonText className="tracking-wider">{value}</NeonText>}
  </div>
);

export const LeftViewBalanceTable = () => (
  <div className="grid grid-cols-4 px-7 rounded-component py-3 bg-component-bg border border-component-outlines">
    {MOCK_TRADER_PROFILE_INFO.map((info) => (
      <Row key={info.label} {...info} />
    ))}
  </div>
);
