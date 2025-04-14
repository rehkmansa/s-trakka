import { JSX } from 'react';

export type PropsWithClassname<T = unknown> = T & { className?: string };

export interface TraderProfileRow {
  label: string;
  value: string | number;
  type: 'amount' | 'progression';
}

export type ComponentTypes = keyof JSX.IntrinsicElements;

export type AsComponentProps<T extends ComponentTypes = 'p'> = {
  as?: T;
} & React.ComponentProps<T>;

export type TextProps = React.ComponentProps<'p'>;

export type Maybe<T> = T | string | null;
