import { JSX } from 'react';
import { cn } from '~/lib/utils/helpers';

type Constraints = keyof JSX.IntrinsicElements;

type NeonTextProps<T extends Constraints = 'p'> = {
  as?: T;
} & React.ComponentProps<T>;

export const NeonText = <T extends Constraints>({
  as: comp,
  className,
  ...props
}: NeonTextProps<T>) => {
  /**
   * Makes more sense to cast the comp to p as its default as well as casting
   * the props to corresponding p props, by default typescript would enforce
   * proper props.
   */
  const Comp = (comp ?? 'p') as 'p';

  return (
    <Comp
      className={cn('text-base-green text-shadow-[0px_0px_10px_#00EC42]', className)}
      {...(props as React.ComponentProps<'p'>)}
    />
  );
};
