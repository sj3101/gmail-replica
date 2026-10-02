import { useState, useEffect, useCallback, useRef } from 'react';
import { emailApi } from '@/api';

/**
 * Hook to fetch and manage a single email thread.
 * Auto-marks unread emails as read when opened.
 */
export function useEmail(emailId) {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasMarkedReadRef = useRef(false);

  const fetchEmail = useCallback(async () => {
    if (!emailId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await emailApi.getById(emailId);
      setEmail(data);

      // Auto mark as read when opened (only once per mount/id)
      if (!data.isRead && !hasMarkedReadRef.current) {
        hasMarkedReadRef.current = true;
        await emailApi.markRead(emailId, true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [emailId]);

  useEffect(() => {
    hasMarkedReadRef.current = false;
    fetchEmail();

    const unsubscribe = emailApi.subscribe(() => {
      fetchEmail();
    });
    return unsubscribe;
  }, [emailId, fetchEmail]);

  return { email, loading, error, refetch: fetchEmail };
}
