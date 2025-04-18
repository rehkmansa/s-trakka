import clsx from 'clsx';
import { type ClassArray } from 'clsx';
import millify from 'millify';
import { twMerge } from 'tailwind-merge';
import { TOKENS_DELIMITER, TOKENS_QUERY_KEY, WALLET_ADDRESS_REGEX } from '~/constants/api';
import { SELECTION_COLORS, SelectionColors } from '~/constants/colors';
import { QueryParams } from '~/context/query-store';
import { ComponentTypes, IsUncertain } from '~/types/global';

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

export const assignSelectionColor = (position: number): SelectionColors => {
  return SELECTION_COLORS[position % SELECTION_COLORS.length];
};

export const iife = <T>(fn: () => T) => fn();

export const parseSelectedTokens = (query: IsUncertain<string>) => {
  if (!query) return [];
  return decodeURIComponent(query).split(TOKENS_DELIMITER);
};

export const getTokenIdsFromQuery = (queryStore: QueryParams) => {
  return parseSelectedTokens(queryStore[TOKENS_QUERY_KEY]);
};

export const shortenUsername = (name: string, length = 14) => {
  const delimiter = '...';
  if (name.length <= length) return name;

  return `${name.slice(0, length - delimiter.length)}${delimiter}`;
};
