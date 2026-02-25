// src/hooks/useTapakSuci.ts
// Hook untuk Tapak Suci data management

import { useState, useEffect } from 'react';
import { tapakSuciService, TapakSuciCompleteData } from '@/services/tapakSuciService';

export function useTapakSuci() {
  const [data, setData] = useState<TapakSuciCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await tapakSuciService.getCompleteData();
        
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
      
      const result = await tapakSuciService.getCompleteData();
      
      if (result) {
        setData(result);
      } else {
        setError('Gagal memuat data Tapak Suci');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data Tapak Suci');
      console.error('Error in useTapakSuci refetch:', err);
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
