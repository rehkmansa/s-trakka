export interface UserProfile {
  balance: number;
  est_value: number;
  pnl: number;
  upnl: number;
  profitable: boolean;
}

// Simple hash function
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Deterministic pseudo-random generator
const createRNG = (seed: number) => {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
};

export const getMockUserProfile = (name: string): UserProfile => {
  const seed = hashString(name);
  const rand = createRNG(seed);

  const balance = parseFloat((rand() * 10000).toFixed(2));
  const est_value = parseFloat((balance + rand() * 2000 - 1000).toFixed(2));
  const pnl = parseFloat(((est_value - balance) * 0.5).toFixed(2));
  const upnl = parseFloat(((est_value - balance) * 0.5).toFixed(2));
  const profitable = pnl + upnl > 0;

  return { balance, est_value, pnl, upnl, profitable };
};
