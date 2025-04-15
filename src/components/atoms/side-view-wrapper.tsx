import { cn } from '~/lib/utils/helpers';

export const SideViewWrapper = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn(
        'w-full shrink-0 gap-y-2.5 flex-1 h-full flex flex-col overflow-hidden',
        className
      )}
    />
  );
};
