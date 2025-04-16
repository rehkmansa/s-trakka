import { cn } from '~/lib/utils/helpers';

type TableItemProps = React.ComponentProps<'div'>;

export const TableHeaderGradient = ({ className, ...props }: TableItemProps) => (
  <div
    className="bg-[linear-gradient(to_right,#474747_31%,#f0f0f0_51%,#474747_71.5%)] w-full h-px"
    {...props}
  />
);

export const TableHeaderCell = ({ className, ...props }: TableItemProps) => (
  <div className={cn('text-sm/[20px] font-extralight text-chart-title', className)} {...props} />
);
