import { Fragment, PropsWithChildren, useEffect } from 'react';
import { Skeleton } from '~/components/atoms/skeleton';
import { TableHeaderCell, TableHeaderGradient } from '~/components/atoms/table';
import { TextWithEthIcon } from '~/components/atoms/text-with-eth-icon';
import { FadeYWhileInView, StaggeredAnimation } from '~/components/hoc/animations';
import { InfiniteScrollView } from '~/components/organisms/infinite-scroll-view';
import { PAGE_LIMIT, TOKENS_DELIMITER, TOKENS_QUERY_KEY } from '~/constants/api';
import { SelectionColors } from '~/constants/colors';
import { useQueryStore } from '~/context/query-store';
import { SelectedToken, useSelectedTokenStore } from '~/context/selected-token';
import {
  assignSelectionColor,
  cn,
  getAvatarUrl,
  iife,
  parseSelectedTokens,
  rangeArray,
  toHumanReadableNumber,
} from '~/lib/utils/helpers';
import { Token } from '~/mock/data';
import { Maybe, PropsWithClassname } from '~/types/global';

const GRID_STYLE = 'grid grid-cols-5 gap-4';

const TABLE_HEADERS = [
  { label: 'Token Name', className: 'col-span-2' },
  { label: 'Market Cap', className: 'text-base-text text-right' },
  { label: 'Value', className: 'text-right' },
  { label: 'Amount', className: 'text-right' },
];

const getImageSrc = (src: Maybe<string>, name: string) => src ?? getAvatarUrl(name);

interface WrapperProps extends PropsWithChildren {
  className?: string;
  onClick?(): void;
  style?: React.CSSProperties;
}

const Wrapper = ({ children, onClick, className, style }: WrapperProps) => (
  <div
    role="button"
    className={cn(
      'flex items-center justify-center h-[30px] text-base-text/90 font-accent',
      className
    )}
    style={style}
    onClick={onClick}
  >
    <div className={cn('text-sm w-full px-3.5', GRID_STYLE)}>{children}</div>
  </div>
);

const SkeletonLoader = ({ className }: PropsWithClassname) => (
  <Skeleton className={cn('h-4 bg-component-outlines/10 rounded-none', className)} />
);

export const HoldingsTokenTableLoader = ({ rows }: { rows: number }) => (
  <Fragment>
    {rangeArray(rows).map((n) => (
      <Wrapper key={n}>
        <SkeletonLoader className="col-span-2" />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </Wrapper>
    ))}
  </Fragment>
);

interface TableRowProps {
  selectionColor: string;
  token: Token;
  onClick: () => void;
  selected: boolean;
}
const TableRow = ({ onClick, selectionColor, token, selected }: TableRowProps) => (
  <Wrapper
    style={
      {
        '--list-selection-color': `var(${selectionColor})`,
      } as React.CSSProperties
    }
    key={token.address}
    onClick={onClick}
    className={cn(
      'relative cursor-pointer before:hidden hover:before:block',
      'before:absolute before:inset-0',
      'before:bg-(--list-selection-color)/30 before:blur-[2px]',
      { 'border border-(--list-selection-color) text-base-text': selected }
    )}
  >
    <div className="col-span-2 flex items-center gap-3 relative">
      <img
        className="size-5 rounded-full object-cover"
        src={getImageSrc(token.logo, token.symbol)}
        alt=""
      />
      <h4>{token.symbol}</h4>
    </div>
    <p className="text-right relative">{toHumanReadableNumber(token.market_cap)}</p>
    <TextWithEthIcon className="text-right justify-end relative">
      {token.value.toFixed(2)}
    </TextWithEthIcon>
    <p className="text-right relative">{token.amount.toFixed(2)}</p>
  </Wrapper>
);

const TableAnimator = ({ idx, children }: PropsWithChildren<{ idx: number }>) => {
  const Comp = idx < PAGE_LIMIT ? StaggeredAnimation.Child : FadeYWhileInView;

  return <Comp>{children}</Comp>;
};

interface HoldingsTokenTableProps {
  data: Token[];
  onLoadMore: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
  offset: number;
  search: string;
}

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

  const { addToken, removeToken, bulkAddTokens, tokens } = useSelectedTokenStore();

  const { addQuery, queryParams, removeQuery } = useQueryStore();

  const tokensQuery = queryParams[TOKENS_QUERY_KEY];

  const selectedTokens = parseSelectedTokens(tokensQuery);

  const handleWrapperClick = (tokenId: string, name: string) => {
    const activeTokenIds = parseSelectedTokens(tokensQuery);

    if (tokens[tokenId]) {
      removeToken(tokenId);
    } else {
      addToken({ name, id: Number(tokenId) });
    }

    if (!activeTokenIds.length) return addQuery(TOKENS_QUERY_KEY, tokenId);

    if (activeTokenIds.includes(tokenId)) {
      const filtered = activeTokenIds.filter((t) => t != tokenId).join(TOKENS_DELIMITER);

      if (!filtered.length) return removeQuery(TOKENS_QUERY_KEY);

      return addQuery(TOKENS_QUERY_KEY, encodeURIComponent(filtered));
    }

    addQuery(
      TOKENS_QUERY_KEY,
      encodeURIComponent([...activeTokenIds, tokenId].join(TOKENS_DELIMITER))
    );
  };

  // This should hydrate the tokens store only on mount so we sync url state
  // with token store state.
  useEffect(() => {
    const hasTokens = Object.keys(tokens).length > 0;
    const selectedTokens = parseSelectedTokens(tokensQuery);

    if (hasTokens || !selectedTokens.length) return;

    const parsedSelectedTokens: SelectedToken[] = data
      .filter((rec) => selectedTokens.includes(rec.id.toString()))
      .map(
        (c) =>
          ({
            name: c.symbol,
            id: c.id,
          } satisfies SelectedToken)
      );

    bulkAddTokens(parsedSelectedTokens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 flex-col flex overflow-hidden min-h-0">
      <div className="">
        <div className={cn('px-3 pb-2 shrink-0', GRID_STYLE)}>
          {TABLE_HEADERS.map((header) => (
            <TableHeaderCell className={header.className} key={header.label}>
              <p>{header.label}</p>
            </TableHeaderCell>
          ))}
        </div>
        <TableHeaderGradient />
      </div>
      {/* Animation with whileInView does not refire because it has already fired before,
       hence the reason to change key so it can rerender. */}
      <StaggeredAnimation animate className="flex-1 overflow-hidden">
        <InfiniteScrollView
          hasMore={hasMore}
          onLoadMore={onLoadMore}
          loading={isFetchingMore}
          className="h-full overflow-y-auto outline-none focus:ring focus:ring-component-outlines no-scrollbar"
        >
          {data.map((rec, idx) => {
            const stringId = rec.id.toString();

            const position = selectedTokens.findIndex((c) => c == stringId);

            const selected = position >= 0;

            const selectionColor: SelectionColors = iife(() => {
              if (position < 0) return assignSelectionColor(selectedTokens.length);
              return assignSelectionColor(position);
            });

            const addOrRemoveTokenSelection = () => handleWrapperClick(stringId, rec.symbol);

            return (
              <TableAnimator key={rec.address} idx={idx}>
                <TableRow
                  token={rec}
                  onClick={addOrRemoveTokenSelection}
                  selected={selected}
                  selectionColor={selectionColor}
                />
              </TableAnimator>
            );
          })}

          {isFetchingMore && <HoldingsTokenTableLoader rows={4} />}
        </InfiniteScrollView>
      </StaggeredAnimation>
    </div>
  );
};
