import { cn } from '~/lib/utils/helpers';
import { PropsWithClassname } from '~/types/global';

export const ShimmerLoader = ({ className }: PropsWithClassname) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-component-bg glister-animation',
        className
      )}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent w-1/3 h-full animate-shimmer pointer-events-none" /> */}
    </div>
  );
};
