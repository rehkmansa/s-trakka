import { TableHeaderCell, TableHeaderGradient } from '~/components/atoms/table';
import { useSelectedTokenStore } from '~/context/selected-token';
import { useTokenLiveActivity } from '~/hooks/use-token-live-activity';
import { cn } from '~/lib/utils/helpers';
import {
  TRANSACTION_TABLE_GRID_STYLE,
  TransactionTableRow,
} from '~/components/molecules/transaction-table/row';

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
    <div className={cn(TRANSACTION_TABLE_GRID_STYLE)}>
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
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <TableHeader />
      <div className="flex-1 overflow-y-auto space-y-3 text-sm text-base-text/90 font-accent no-scrollbar">
        {transactions.map((trx) => (
          <TransactionTableRow tokens={tokens} transaction={trx} key={trx.id} />
        ))}
      </div>
    </div>
  );
};
