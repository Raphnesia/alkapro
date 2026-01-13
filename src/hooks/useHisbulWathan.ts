// src/hooks/useHisbulWathan.ts
// Hook untuk Hisbul Wathan data management

import { useState, useEffect } from 'react';
import { hisbulWathanService, HisbulWathanCompleteData } from '@/services/hisbulWathanService';

export function useHisbulWathan() {
  const [data, setData] = useState<HisbulWathanCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await hisbulWathanService.getCompleteData();
        
        if (result) {
          setData(result);
        } else {
          // Backend merespons tapi data kosong
          console.log('Backend merespons tapi data kosong, menggunakan fallback data');
        }
      } catch (err) {
        // Backend tidak bisa diakses dari browser (CORS issue)
        console.log('Backend tidak bisa diakses dari browser, menggunakan fallback data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await hisbulWathanService.getCompleteData();
      
      if (result) {
        setData(result);
      } else {
        setError('Gagal memuat data Hisbul Wathan');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data Hisbul Wathan');
      console.error('Error in useHisbulWathan refetch:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
}
