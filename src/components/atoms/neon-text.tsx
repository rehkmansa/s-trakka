import { cn, makeComponent } from '~/lib/utils/helpers';
import { AsComponentProps, ComponentTypes, TextProps } from '~/types/global';

export const NeonText = <T extends ComponentTypes = 'p'>({
  as: comp,
  className,
  ...props
}: AsComponentProps<T>) => {
  const Comp = makeComponent(comp);

  return (
    <Comp
      className={cn('text-base-green text-shadow-[0px_0px_10px_#00EC42]', className)}
      {...(props as TextProps)}
    />
  );
};
