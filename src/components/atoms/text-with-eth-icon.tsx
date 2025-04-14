import { EthIcon } from '~/assets/icons';
import { cn, makeComponent } from '~/lib/utils/helpers';
import { AsComponentProps, ComponentTypes, TextProps } from '~/types/global';

export const TextWithEthIcon = <T extends ComponentTypes = 'p'>({
  as: comp,
  className,
  children,
  ...props
}: AsComponentProps<T>) => {
  const Comp = makeComponent(comp);

  return (
    <Comp
      className={cn('tracking-wider flex items-center gap-0.5', className)}
      {...(props as TextProps)}
    >
      {children}
      <EthIcon />
    </Comp>
  );
};
