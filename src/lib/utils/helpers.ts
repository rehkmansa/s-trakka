import clsx from 'clsx';
import { type ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ComponentTypes } from '~/types/global';

export const cn = (...inputs: ClassArray) => twMerge(clsx(inputs));

export const formatWalletAddress = (address: string): string => {
  const prefix = address?.slice(0, 6);
  const suffix = address?.slice(-6);
  return `${prefix}....${suffix}`;
};

export const mockRequest = async (durationInMs = 500) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, durationInMs);
  });
};

export const mergeArrayRecords = <T extends unknown[]>(old: T | undefined, newData: T) => {
  if (!old) return newData;
  return [...old, ...newData];
};

/**
 * Makes more sense to cast the comp to p as its default as well as casting
 * the props to corresponding p props, by default typescript would enforce
 * proper props.
 */
export const makeComponent = (comp: ComponentTypes | undefined) => (comp ?? 'p') as 'p';

export const getAvatarUrl = (name: string): string => {
  const encodedName = encodeURIComponent(name.trim());
  return `https://ui-avatars.com/api/?name=${encodedName}`;
};
