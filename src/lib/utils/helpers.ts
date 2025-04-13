import clsx from 'clsx';
import { type ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassArray) => twMerge(clsx(inputs));

export const formatWalletAddress = (address: string): string => {
  const prefix = address?.slice(0, 6);
  const suffix = address?.slice(-6);
  return `${prefix}....${suffix}`;
};
