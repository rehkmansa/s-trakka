import { TextWithEthIcon } from '~/components/atoms/text-with-eth-icon';
import { cn, getAvatarUrl, toHumanReadableNumber } from '~/lib/utils/helpers';
import { Token } from '~/mock/data';
import { Maybe } from '~/types/global';

const tableHeaders = [
  { label: 'Token Name', className: 'col-span-2' },
  { label: 'Market Cap', className: 'text-base-text text-right' },
  { label: 'Value', className: 'text-right' },
  { label: 'Amount', className: 'text-right' },
];

const getImageSrc = (src: Maybe<string>, name: string) => src ?? getAvatarUrl(name);

const GRID_STYLE = 'grid grid-cols-5 gap-4';

interface HoldingsTokenTableProps {
  data: Token[];
}

/**
 * HoldingsTokenTable
 *
 * In a production-grade codebase, a safer option would be using TanStack Table
 * (formerly React Table) with row virtualization (e.g., `tanstack-virtual`)
 * for better performance and flexibility — especially over using basic
 * grid-based or plain HTML table solutions.
 */
export const HoldingsTokenTable = ({ data }: HoldingsTokenTableProps) => {
  return (
    <div>
      <div className={cn('px-3 pb-2', GRID_STYLE)}>
        {tableHeaders.map((header) => (
          <div className={cn('text-sm/[20px] font-extralight text-chart-title', header.className)}>
            <p>{header.label}</p>
          </div>
        ))}
      </div>
      {data.map((rec) => (
        <div key={rec.id} className={cn('text-sm/[188.4%] font-accent py-0.5 px-3.5', GRID_STYLE)}>
          <div className="col-span-2 flex items-center gap-3">
            <img
              className="size-5 rounded-full object-cover"
              src={getImageSrc(rec.logo, rec.symbol)}
              alt=""
            />
            <h4>{rec.symbol}</h4>
          </div>
          <p className="text-right">{toHumanReadableNumber(rec.market_cap)}</p>
          <TextWithEthIcon className="text-right justify-end">
            {rec.value.toFixed(2)}
          </TextWithEthIcon>
          <p className="text-right">{rec.amount.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};
