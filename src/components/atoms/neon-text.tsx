import { cn, makeComponent } from '~/lib/utils/helpers';
import { AsComponentProps, ComponentTypes, TextProps } from '~/types/global';

type Variant = 'downtrend' | 'uptrend';

const ColorMap: Record<Variant, string> = {
  downtrend: '--color-base-red',
  uptrend: '--color-base-green',
};

// text-shadow-[
export const NeonText = <T extends ComponentTypes = 'p'>({
  as: comp,
  className,
  variant = 'uptrend',
  ...props
}: AsComponentProps<T> & { variant?: Variant }) => {
  const Comp = makeComponent(comp);

  return (
    <Comp
      style={
        {
          '--neon-text': `var(${ColorMap[variant]})`,
        } as React.CSSProperties
      }
      className={cn('text-(--neon-text) text-shadow-[0px_0px_10px_var(--neon-text)]', className)}
      {...(props as TextProps)}
    />
  );
};
