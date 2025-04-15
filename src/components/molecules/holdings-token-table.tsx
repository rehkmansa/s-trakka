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
    <div className="flex-1 flex-col gap-1 flex overflow-hidden min-h-0">
      <div className="">
        <div className={cn('px-3 pb-2 shrink-0', GRID_STYLE)}>
          {tableHeaders.map((header) => (
            <div
              className={cn('text-sm/[20px] font-extralight text-chart-title', header.className)}
            >
              <p>{header.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-[linear-gradient(to_right,#474747_31%,#f0f0f0_51%,#474747_71.5%)] w-full h-px" />
      </div>
      <div className="flex-1 overflow-y-auto outline-none focus:ring focus:ring-component-outlines">
        {data.map((rec) => (
          <div className="flex items-center justify-center h-[30px]">
            <div key={rec.id} className={cn('text-sm w-full px-3.5', GRID_STYLE)}>
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
          </div>
        ))}
      </div>
    </div>
  );
};
