import { MOCK_RANDOM_USERS } from '~/mock/data';

export type Transaction = {
  id: string;
  dateTime: string; // ISO 8601
  time: string; // still keep for display
  type: 'buy' | 'sell';
  token: string;
  price_usd: number;
  token_amount: number;
  weth: number;
  usd: number;
  pnl: number;
  user: string;
};

// Returns both a human-readable time and a true timestamp
const generateTimeFields = (index: number): { dateTime: string; time: string } => {
  const now = Date.now();
  let msAgo = 0;

  if (index < 5) msAgo = (index * 5 + 5) * 1000;
  else if (index < 15) msAgo = (index - 4) * 60 * 1000;
  else msAgo = (index - 14) * 2 * 60 * 1000;

  const dateTime = new Date(now - msAgo).toISOString();
  const time = msAgo < 60000 ? `${Math.floor(msAgo / 1000)}s` : `${Math.floor(msAgo / 60000)}min`;

  return { dateTime, time };
};

// Simple seeded PRNG (LCG)
const seedRandom = (seed: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return (h >>> 0) / 4294967295;
  };
};

export const generateTransactions = (tokenIds: string[]): Transaction[] => {
  const allTxns: Transaction[] = [];

  for (const tokenId of tokenIds) {
    const rng = seedRandom(tokenId);

    const txns: Transaction[] = Array.from({ length: 30 }, (_, i) => {
      const { time, dateTime } = generateTimeFields(i);
      const type = rng() > 0.5 ? 'buy' : 'sell';
      const price_usd = parseFloat((rng() * 1000 + 1).toFixed(2));
      const token_amount = parseFloat((rng() * 20 + 1).toFixed(3));
      const weth = parseFloat((price_usd * token_amount * 0.0003).toFixed(3));
      const usd = parseFloat((price_usd * token_amount).toFixed(2));
      const pnl = parseFloat(((rng() - 0.5) * 50).toFixed(2));
      const user = MOCK_RANDOM_USERS[Math.floor(rng() * MOCK_RANDOM_USERS.length)];

      return {
        id: `${tokenId}-${i}`,
        dateTime,
        time,
        type,
        token: tokenId,
        price_usd,
        token_amount,
        weth,
        usd,
        pnl,
        user,
      };
    });

    allTxns.push(...txns);
  }

  return allTxns.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
};
