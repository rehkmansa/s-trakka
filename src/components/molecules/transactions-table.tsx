import { TableHeaderCell, TableHeaderGradient } from '~/components/atoms/table';
import { cn } from '~/lib/utils/helpers';

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

export const TransactionsTable = () => {
  return (
    <div>
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
    </div>
  );
};
