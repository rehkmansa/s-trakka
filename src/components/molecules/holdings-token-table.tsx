import { PropsWithChildren } from 'react';
import { Skeleton } from '~/components/atoms/skeleton';
import { TextWithEthIcon } from '~/components/atoms/text-with-eth-icon';
import { InfiniteScrollView } from '~/components/organisms/infinite-scroll-view';
import { TOKENS_QUERY_KEY } from '~/constants/api';
import { useWindowQuery } from '~/hooks/use-window-query-params';
import {
  assignSelectionColor,
  cn,
  getAvatarUrl,
  rangeArray,
  toHumanReadableNumber,
} from '~/lib/utils/helpers';
import { Token } from '~/mock/data';
import { IsUncertain, Maybe, PropsWithClassname } from '~/types/global';

const tableHeaders = [
  { label: 'Token Name', className: 'col-span-2' },
  { label: 'Market Cap', className: 'text-base-text text-right' },
  { label: 'Value', className: 'text-right' },
  { label: 'Amount', className: 'text-right' },
];

const getImageSrc = (src: Maybe<string>, name: string) => src ?? getAvatarUrl(name);

const GRID_STYLE = 'grid grid-cols-5 gap-4';

interface WrapperProps extends PropsWithChildren {
  className?: string;
  onClick?(): void;
  style?: React.CSSProperties;
}

const Wrapper = ({ children, onClick, className, style }: WrapperProps) => (
  <div
    role="button"
    className={cn(
      'flex items-center justify-center h-[30px] text-base-text/80 font-accent',
      className
    )}
    style={style}
    onClick={onClick}
  >
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

const DELIMITER = ',';

const getCurrentQueryParams = (query: IsUncertain<string>) => {
  if (!query) return [];
  return decodeURIComponent(query).split(DELIMITER);
};

export const HoldingsTokenTableLoader = ({ rows }: { rows: number }) =>
  rangeArray(rows).map((n) => (
    <Wrapper key={n}>
      <SkeletonLoader className="col-span-2" />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </Wrapper>
  ));

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

  const { addQuery, queryParams, removeQuery } = useWindowQuery();

  const tokensQuery = queryParams[TOKENS_QUERY_KEY];

  const selectedTokens = getCurrentQueryParams(tokensQuery);

  const handleWrapperClick = (tokenId: string) => {
    const activeTokenIds = getCurrentQueryParams(tokensQuery);

    if (!activeTokenIds.length) return addQuery(TOKENS_QUERY_KEY, tokenId);

    if (activeTokenIds.includes(tokenId)) {
      const filtered = activeTokenIds.filter((t) => t != tokenId).join(DELIMITER);

      if (!filtered.length) return removeQuery(TOKENS_QUERY_KEY);

      return addQuery(TOKENS_QUERY_KEY, encodeURIComponent(filtered));
    }

    addQuery(TOKENS_QUERY_KEY, encodeURIComponent([...activeTokenIds, tokenId].join(DELIMITER)));
  };

  return (
    <div className="flex-1 flex-col flex overflow-hidden min-h-0">
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
        {data.map((rec, id) => {
          const idx = rec.id.toString();
          const isSelected = selectedTokens.includes(idx);

          return (
            <Wrapper
              style={
                {
                  '--list-selection-color': `var(${assignSelectionColor(id)})`,
                } as React.CSSProperties
              }
              key={rec.address}
              onClick={() => handleWrapperClick(idx)}
              className={cn(
                'relative cursor-pointer before:hidden hover:before:block',
                'before:absolute before:inset-0',
                'before:bg-(--list-selection-color)/30 before:blur-[2px]',
                { 'border border-(--list-selection-color) text-base-text': isSelected }
              )}
            >
              <div className="col-span-2 flex items-center gap-3 relative">
                <img
                  className="size-5 rounded-full object-cover"
                  src={getImageSrc(rec.logo, rec.symbol)}
                  alt=""
                />
                <h4>{rec.symbol}</h4>
              </div>
              <p className="text-right relative">{toHumanReadableNumber(rec.market_cap)}</p>
              <TextWithEthIcon className="text-right justify-end relative">
                {rec.value.toFixed(2)}
              </TextWithEthIcon>
              <p className="text-right relative">{rec.amount.toFixed(2)}</p>
            </Wrapper>
          );
        })}

        {isFetchingMore && <HoldingsTokenTableLoader rows={4} />}
      </InfiniteScrollView>
    </div>
  );
};
