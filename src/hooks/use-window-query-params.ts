import { useCallback, useEffect, useState } from 'react';
import { IsUncertain } from '~/types/global';

const getSearchParams = () => new URLSearchParams(window.location.search);

const getQueryAsObject = () => {
  const params = getSearchParams();
  const result: Record<string, IsUncertain<string>> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

export const useWindowQuery = () => {
  const [queryParams, setQueryParams] = useState(() => getQueryAsObject());

  const updateSearch = useCallback((params: URLSearchParams) => {
    const paramsLength = Array.from(params).length;

    let newUrl = window.location.pathname;

    // Only add query param if there is a query param to be added.
    if (paramsLength) {
      newUrl += `?${params.toString()}`;
    }

    window.history.replaceState({}, '', newUrl);
    setQueryParams(getQueryAsObject());
  }, []);

  const addQuery = useCallback(
    (key: string, value: string) => {
      const params = getSearchParams();
      params.set(key, value);
      updateSearch(params);
    },
    [updateSearch]
  );

  const removeQuery = useCallback(
    (key: string) => {
      const params = getSearchParams();
      params.delete(key);
      updateSearch(params);
    },
    [updateSearch]
  );

  useEffect(() => {
    const onPopState = () => {
      setQueryParams(getQueryAsObject());
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return { queryParams, addQuery, removeQuery };
};
