import clsx from 'clsx';
import { type ClassArray } from 'clsx';
import millify from 'millify';
import { twMerge } from 'tailwind-merge';
import { WALLET_ADDRESS_REGEX } from '~/constants/api';
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

export const mergeArrayRecords = <T extends Record<string, unknown>, U extends keyof T>(
  oldList: T[] = [],
  newList: T[] = [],
  uniqueKey: U
): T[] => {
  const map = new Map<string, T>();
  [...oldList, ...newList].forEach((item) => {
    map.set(String(item[uniqueKey]), item);
  });
  return Array.from(map.values());
};

/**
 * Makes more sense to cast the comp to p as its default as well as casting
 * the props to corresponding p props, by default typescript would enforce
 * proper props.
 */
export const makeComponent = (comp: ComponentTypes | undefined) => (comp ?? 'p') as 'p';

export const getAvatarUrl = (name: string): string => {
  const encodedName = encodeURIComponent(name.trim());
  return `https://ui-avatars.com/api/?name=${encodedName}&background=3A3749&color=ffffff`;
};

export const toHumanReadableNumber = (num: number) => millify(num, { precision: 2 });

export const isWalletAddress = (str: string) => WALLET_ADDRESS_REGEX.test(str);

export const lowercase = (str: string) => str.toLowerCase();

export const rangeArray = (length: number): number[] => Array.from({ length }, (_, i) => i);
