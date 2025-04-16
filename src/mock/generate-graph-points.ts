const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x); // returns a float [0, 1)
};

export const generateGraphPoints = (id: number, length = 12): number[] => {
  let seed = (id % 100) - 50; // start between -50 and +50
  const points: number[] = [];

  for (let i = 0; i < length; i++) {
    const noise = pseudoRandom(id + i) * 20 - 10; // range [-10, +10]
    const next = Math.round(seed + noise);
    points.push(next);
    seed = next; // use new point as next base
  }

  return points;
};
