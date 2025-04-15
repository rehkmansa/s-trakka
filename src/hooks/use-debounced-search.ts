import { useState, useEffect } from 'react';

export const useDebouncedSearch = (initialValue = '', delay = 300) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return { value, debouncedValue, setValue };
};
