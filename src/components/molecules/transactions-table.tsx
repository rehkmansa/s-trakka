import { AnimatePresence } from 'motion/react';
import { NeonText } from '~/components/atoms/neon-text';
import { TableHeaderCell, TableHeaderGradient } from '~/components/atoms/table';
import { FadeYWhileInView } from '~/components/hoc/animations';
import { Popover } from '~/components/hoc/popover';
import { UserProfileCard } from '~/components/molecules/user-profile-card';
import { TokenMap, useSelectedTokenStore } from '~/context/selected-token';
import { useTokenLiveActivity } from '~/hooks/use-token-live-activity';
import { Transaction } from '~/lib/utils/generate-transactions';
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

const TableRow = ({ transaction, tokens }: { transaction: Transaction; tokens: TokenMap }) => {
  return (
    <FadeYWhileInView
      initialY={15}
      className="h-5 first-of-type:mt-2 last-of-type:pb-2 flex items-center justify-center"
      // props={{onHoverStart: }}
    >
      <div className={cn('w-full', GRID_STYLE)}>
        <span>{transaction.time}</span>
        <NeonText
          className="uppercase"
          variant={transaction.type === 'buy' ? 'uptrend' : 'downtrend'}
        >
          {transaction.type}
        </NeonText>
        <span>{tokens[transaction.token]?.name ?? transaction.token}</span>
        <span>{transaction.price_usd}</span>
        <span>{transaction.token_amount.toFixed(3)}</span>
        <span>{transaction.weth.toFixed(2)}</span>
        <span>{transaction.usd}</span>
        <NeonText variant={transaction.pnl < 1 ? 'downtrend' : 'uptrend'}>
          {Math.abs(transaction.pnl).toFixed(2)}
        </NeonText>
        <Popover<HTMLButtonElement, HTMLDivElement>
          renderTrigger={(props) => (
            <button className="text-left w-full" type="button" {...props}>
              {shortenUsername(transaction.user)}
            </button>
          )}
          renderContent={({ isOpen, ...props }) => (
            <AnimatePresence>
              {isOpen && (
                <div {...props}>
                  <UserProfileCard />
                </div>
              )}
            </AnimatePresence>
          )}
        />
      </div>
    </FadeYWhileInView>
  );
};

export const TransactionsTable = () => {
  const { tokens } = useSelectedTokenStore();
  const transactions = useTokenLiveActivity();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TableHeader />
      <div className="flex-1 overflow-y-auto space-y-3 text-sm text-base-text/90 font-accent no-scrollbar">
        {transactions.map((trx) => (
          <TableRow tokens={tokens} transaction={trx} key={trx.id} />
        ))}
      </div>
    </div>
  );
};
