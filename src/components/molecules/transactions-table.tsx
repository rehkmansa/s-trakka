import { NeonText } from '~/components/atoms/neon-text';
import { TableHeaderCell, TableHeaderGradient } from '~/components/atoms/table';
import { FadeYWhileInView } from '~/components/organisms/animations';
import { useSelectedTokenStore } from '~/context/selected-token';
import { useTokenLiveActivity } from '~/hooks/use-token-live-activity';
import { cn, shortenUsername } from '~/lib/utils/helpers';

const GRID_STYLE = 'grid grid-cols-9 gap-2 px-12';

const HEADER_FIELD = [
  { label: 'Time' },
  { label: 'Type' },
  { label: 'Token' },
  { label: 'Price USD' },
  { label: 'Token Amount', className: 'text-base-text' },
  { label: 'WETH' },
  { label: 'USD' },
  { label: 'PNL' },
  { label: 'User' },
];

const TableHeader = () => (
  <div className="space-y-1.5">
    <div className={cn('', GRID_STYLE)}>
      {HEADER_FIELD.map((header) => (
        <TableHeaderCell className={header.className} key={header.label}>
          <span>{header.label}</span>
        </TableHeaderCell>
      ))}
    </div>
    <TableHeaderGradient />
  </div>
);

export const TransactionsTable = () => {
  const { tokens } = useSelectedTokenStore();
  const transactions = useTokenLiveActivity();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TableHeader />
      <div className="flex-1 overflow-y-auto space-y-3 text-sm font-accent no-scrollbar">
        {transactions.map((t) => (
          <FadeYWhileInView
            initialY={15}
            key={t.id}
            className="h-5 first-of-type:mt-2 last-of-type:pb-2 flex items-center justify-center"
          >
            <div className={cn('w-full', GRID_STYLE)}>
              <span>{t.time}</span>
              <NeonText className="uppercase" variant={t.type === 'buy' ? 'uptrend' : 'downtrend'}>
                {t.type}
              </NeonText>
              <span>{tokens[t.token]?.name ?? t.token}</span>
              <span>{t.price_usd}</span>
              <span>{t.token_amount.toFixed(3)}</span>
              <span>{t.weth.toFixed(2)}</span>
              <span>{t.usd}</span>
              <NeonText variant={t.pnl < 1 ? 'downtrend' : 'uptrend'}>
                {Math.abs(t.pnl).toFixed(2)}
              </NeonText>
              <button className="w-full block text-left" type="button">
                {shortenUsername(t.user)}
              </button>
            </div>
          </FadeYWhileInView>
        ))}
      </div>
    </div>
  );
};
