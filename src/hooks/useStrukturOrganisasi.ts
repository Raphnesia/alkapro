// src/hooks/useStrukturOrganisasi.ts
// Hook untuk Struktur Organisasi data management

import { useState, useEffect } from 'react';
import { strukturOrganisasiService, StrukturOrganisasiCompleteData } from '@/services/strukturOrganisasiService';

export function useStrukturOrganisasi() {
  const [data, setData] = useState<StrukturOrganisasiCompleteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await strukturOrganisasiService.getCompleteData();
        
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
      
      const result = await strukturOrganisasiService.getCompleteData();
      
      if (result) {
        setData(result);
      } else {
        setError('Gagal memuat data Struktur Organisasi');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data Struktur Organisasi');
      console.error('Error in useStrukturOrganisasi refetch:', err);
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