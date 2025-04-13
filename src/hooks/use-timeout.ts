import { useRef, useCallback, useEffect } from 'react';

/**
 * A simple timer hook that works like setTimeout.
 *
 * Ensures all timers are cleared on unmount to avoid memory leaks or unexpected
 * behavior in async flows. Useful for imperatively setting and cancelling
 * timers in components.
 */
export const useTimeout = () => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelTimeOut = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, []);

  const setTimeOut = useCallback(
    (callback: () => void, delay: number) => {
      cancelTimeOut();
      timeout.current = setTimeout(callback, delay);
    },
    [cancelTimeOut]
  );

  useEffect(() => cancelTimeOut, [cancelTimeOut]);

  return { setTimeOut, cancelTimeOut };
};
