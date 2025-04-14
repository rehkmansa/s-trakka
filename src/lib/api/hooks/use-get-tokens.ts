import { useCallback, useEffect, useState } from 'react';
import { getTokens } from '~/lib/api/queries/tokens';
import { mergeArrayRecords } from '~/lib/utils/helpers';
import { Token } from '~/mock/data';

export const useGetTokens = (offset: number) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Token[]>();

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTokens({ offset });

      // We want to merge the data vs replace the existing one.
      if (offset > 0) setData((old) => mergeArrayRecords(old, res));
      else setData(res);
    } catch (_) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, isFetchingMore: data && loading };
};
