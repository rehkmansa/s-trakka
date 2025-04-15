import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getTokens } from '~/lib/api/queries/tokens';
import { mergeArrayRecords } from '~/lib/utils/helpers';

type Response = Awaited<ReturnType<typeof getTokens>>;

export const useGetTokens = (offset: number, search: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Response>();
  const lastSearchRef = useRef(search);

  const isNewSearch = useMemo(
    () => search !== lastSearchRef.current && offset === 0,
    [search, offset]
  );

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTokens({ offset, search });

      setData((prev) => {
        if (offset === 0 || isNewSearch || !prev) return res;
        return { data: mergeArrayRecords(prev.data, res.data, 'address'), left: res.left };
      });

      lastSearchRef.current = search;
    } catch (_) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  }, [offset, search, isNewSearch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    isFetchingMore: offset > 0 && loading,
  };
};
