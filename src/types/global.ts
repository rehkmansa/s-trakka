export type PropsWithClassname<T = unknown> = T & { className?: string };

export interface TraderProfileRow {
  label: string;
  value: string | number;
  type: 'amount' | 'progression';
}
