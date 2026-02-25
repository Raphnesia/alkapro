// src/hooks/useVisiMisi.ts
// Hook untuk Visi Misi data management

import { useState, useEffect } from 'react';
import { visiMisiService, VisiMisiCompleteData } from '@/services/visiMisiServiceNew';

export function useVisiMisi() {
  const [data, setData] = useState<VisiMisiCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await visiMisiService.getCompleteData();
        
        if (result) {
          setData(result);
        } else {
          // Tidak set error, biarkan fallback data tampil
          console.log('Backend tidak tersedia, menggunakan fallback data');
        }
      } catch (err) {
        // Tidak set error, biarkan fallback data tampil
        console.log('Backend tidak tersedia, menggunakan fallback data:', err);
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
      
      const result = await visiMisiService.getCompleteData();
      
      if (result) {
        setData(result);
      } else {
        setError('Gagal memuat data Visi Misi');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data Visi Misi');
      console.error('Error in useVisiMisi refetch:', err);
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