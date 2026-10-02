import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { emailApi } from '@/api';
import { ROUTES } from '@/constants';

/**
 * Hook to manage email search state and results.
 */
export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(currentQ);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const performSearch = useCallback(async (q) => {
    if (!q || !q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await emailApi.search(q);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    performSearch(q);

    const unsubscribe = emailApi.subscribe(() => {
      performSearch(searchParams.get('q') || '');
    });
    return unsubscribe;
  }, [searchParams, performSearch]);

  const handleQueryChange = useCallback(
    (newQuery) => {
      setQuery(newQuery);
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (newQuery.trim()) {
          setSearchParams({ q: newQuery });
          navigate(ROUTES.SEARCH + `?q=${encodeURIComponent(newQuery)}`);
        }
        performSearch(newQuery);
      }, 400);
    },
    [navigate, performSearch, setSearchParams]
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setSearchParams({});
  }, [setSearchParams]);

  return { query, results, loading, handleQueryChange, clearSearch, refetch: () => performSearch(query) };
}
