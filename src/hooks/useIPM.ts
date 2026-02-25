// src/hooks/useIPM.ts
// Hook untuk IPM data management

import { useState, useEffect } from 'react';
import { ipmService, IPMCompleteData } from '@/services/ipmServiceNew';

export function useIPM() {
  const [data, setData] = useState<IPMCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await ipmService.getCompleteData();
        
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
      
      const result = await ipmService.getCompleteData();
      
      if (result) {
        setData(result);
      } else {
        setError('Gagal memuat data IPM');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data IPM');
      console.error('Error in useIPM refetch:', err);
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