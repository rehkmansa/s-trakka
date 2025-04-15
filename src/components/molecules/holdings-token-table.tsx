import { PropsWithChildren } from 'react';
import { Skeleton } from '~/components/atoms/skeleton';
import { TextWithEthIcon } from '~/components/atoms/text-with-eth-icon';
import { InfiniteScrollView } from '~/components/organisms/infinite-scroll-view';
import { cn, getAvatarUrl, rangeArray, toHumanReadableNumber } from '~/lib/utils/helpers';
import { Token } from '~/mock/data';
import { Maybe, PropsWithClassname } from '~/types/global';

const tableHeaders = [
  { label: 'Token Name', className: 'col-span-2' },
  { label: 'Market Cap', className: 'text-base-text text-right' },
  { label: 'Value', className: 'text-right' },
  { label: 'Amount', className: 'text-right' },
];

const getImageSrc = (src: Maybe<string>, name: string) => src ?? getAvatarUrl(name);

const GRID_STYLE = 'grid grid-cols-5 gap-4';

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className="flex items-center justify-center h-[30px]">
    <div className={cn('text-sm w-full px-3.5', GRID_STYLE)}>{children}</div>
  </div>
);

interface HoldingsTokenTableProps {
  data: Token[];
  onLoadMore: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
}

const SkeletonLoader = ({ className }: PropsWithClassname) => (
  <Skeleton className={cn('h-4 bg-component-outlines/10 rounded-none', className)} />
);

/**
 * HoldingsTokenTable
 *
 * In a production-grade codebase, a safer option would be using TanStack Table
 * (formerly React Table) with row virtualization (e.g., `tanstack-virtual`)
 * for better performance and flexibility — especially over using basic
 * grid-based or plain HTML table solutions.
 */
export const HoldingsTokenTable = (props: HoldingsTokenTableProps) => {
  const { data, onLoadMore, hasMore, isFetchingMore } = props;
  return (
    <div className="flex-1 flex-col gap-1 flex overflow-hidden min-h-0">
      <div className="">
        <div className={cn('px-3 pb-2 shrink-0', GRID_STYLE)}>
          {tableHeaders.map((header) => (
            <div
              key={header.label}
              className={cn('text-sm/[20px] font-extralight text-chart-title', header.className)}
            >
              <p>{header.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-[linear-gradient(to_right,#474747_31%,#f0f0f0_51%,#474747_71.5%)] w-full h-px" />
      </div>
      <InfiniteScrollView
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        loading={isFetchingMore}
        className="flex-1 overflow-y-auto outline-none focus:ring focus:ring-component-outlines"
      >
        {data.map((rec) => (
          <Wrapper key={rec.address}>
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
          </Wrapper>
        ))}

        {isFetchingMore &&
          rangeArray(4).map((n) => (
            <Wrapper key={n}>
              <SkeletonLoader className="col-span-2" />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </Wrapper>
          ))}
      </InfiniteScrollView>
    </div>
  );
};
