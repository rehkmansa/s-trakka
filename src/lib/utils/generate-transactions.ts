import { MOCK_RANDOM_USERS } from '~/mock/data';

export type Transaction = {
  id: string;
  time: string;
  type: 'buy' | 'sell';
  token: string;
  price_usd: number;
  token_amount: number;
  weth: number;
  usd: number;
  pnl: number;
  user: string;
};

const timeAgo = (index: number) => {
  if (index < 5) return `${index * 5 + 5}s`;
  if (index < 15) return `${index - 4}min`;
  return `${(index - 14) * 2}m`;
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
      const type = rng() > 0.5 ? 'buy' : 'sell';
      const price_usd = parseFloat((rng() * 1000 + 1).toFixed(2));
      const token_amount = parseFloat((rng() * 20 + 1).toFixed(3));
      const weth = parseFloat((price_usd * token_amount * 0.0003).toFixed(3));
      const usd = parseFloat((price_usd * token_amount).toFixed(2));
      const pnl = parseFloat(((rng() - 0.5) * 50).toFixed(2));
      const user = MOCK_RANDOM_USERS[Math.floor(rng() * MOCK_RANDOM_USERS.length)];

      return {
        id: `${tokenId}-${i}`, // 👈 Unique ID per token and transaction index
        time: timeAgo(i),
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

  return allTxns;
};
