// src/hooks/useEkstrakurikuler.ts
// Hook untuk mengelola state ekstrakurikuler

import { useState, useEffect } from 'react';
import { ekstrakurikulerService, EkstrakurikulerCompleteData } from '@/services/ekstrakurikulerService';

export function useEkstrakurikuler() {
  const [data, setData] = useState<EkstrakurikulerCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const result = await ekstrakurikulerService.getCompleteData();
        
        if (result) {
          setData(result);
        } else {
          setError('Gagal memuat data ekstrakurikuler');
        }
      } catch (err) {
        console.error('Error in useEkstrakurikuler:', err);
        setError('Terjadi kesalahan saat memuat data ekstrakurikuler');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
} 