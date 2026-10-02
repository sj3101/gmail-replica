import { useState, useEffect, useCallback } from 'react';
import { emailApi } from '@/api';

/**
 * Hook to fetch and manage a list of emails for a given folder.
 * Listens to real-time storage changes.
 */
export function useEmails(folder) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await emailApi.getByFolder(folder);
      setEmails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    fetchEmails();
    // Subscribe to storage changes
    const unsubscribe = emailApi.subscribe(() => {
      fetchEmails();
    });
    return unsubscribe;
  }, [fetchEmails]);

  const refetch = useCallback(() => fetchEmails(), [fetchEmails]);

  return { emails, loading, error, refetch, setEmails };
}
