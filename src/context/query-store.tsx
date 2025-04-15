import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { IsUncertain } from '~/types/global';

type QueryParams = Record<string, IsUncertain<string>>;

interface QueryContextValue {
  queryParams: QueryParams;
  addQuery: (key: string, value: string) => void;
  removeQuery: (key: string) => void;
}

const QueryContext = createContext<QueryContextValue | null>(null);

const getSearchParams = () => new URLSearchParams(window.location.search);

const getQueryAsObject = (): QueryParams => {
  const params = getSearchParams();
  const result: QueryParams = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryParams, setQueryParams] = useState(getQueryAsObject);

  const updateSearch = useCallback((params: URLSearchParams) => {
    const paramCount = Array.from(params).length;
    let newUrl = window.location.pathname;

    if (paramCount) {
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
    const handlePopState = () => {
      setQueryParams(getQueryAsObject());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <QueryContext.Provider value={{ queryParams, addQuery, removeQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQueryStore = (): QueryContextValue => {
  const ctx = useContext(QueryContext);
  if (!ctx) throw new Error('useQueryStore must be used inside a <QueryProvider>');
  return ctx;
};
