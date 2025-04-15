import { cn } from '~/lib/utils/helpers';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('animate-pulse rounded-md bg-chart-lines  ', className)} {...props} />;
};
