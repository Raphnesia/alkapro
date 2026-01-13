// src/hooks/usePimpinanSMP.ts
// Hook untuk mengelola state dan data fetching pimpinan SMP

import { useState, useEffect } from 'react';
import { pimpinanSMPService, CompletePimpinanSMPData, PimpinanSMP, PimpinanSMPBox, PimpinanSMPSettings } from '@/services/pimpinanSMPService';

export interface UsePimpinanSMPReturn {
  data: CompletePimpinanSMPData | null;
  settings: PimpinanSMPSettings | null;
  pimpinan: PimpinanSMP[];
  boxes: PimpinanSMPBox[];
  isLoading: boolean;
  error: string | null;
  groupedPimpinan: Record<string, PimpinanSMP[]>;
  kepalaSekolah: PimpinanSMP[];
  wakilKepalaSekolah: PimpinanSMP[];
  refreshData: () => Promise<void>;
}

export function usePimpinanSMP(): UsePimpinanSMPReturn {
  const [data, setData] = useState<CompletePimpinanSMPData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const completeData = await pimpinanSMPService.getCompleteData();
      setData(completeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data');
      console.error('Error fetching pimpinan SMP data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  // Helper computed values
  const settings = data?.settings || null;
  const pimpinan = data?.pimpinan || [];
  const boxes = data?.boxes || [];
  
  // Mengelompokkan pimpinan berdasarkan tipe jabatan
  const groupedPimpinan = pimpinanSMPService.groupPimpinanByType(pimpinan);
  
  // Memisahkan kepala sekolah dan wakil kepala sekolah
  const kepalaSekolah = pimpinan.filter(p => p.type.includes('Kepala Sekolah') && !p.type.includes('Wakil'));
  const wakilKepalaSekolah = pimpinan.filter(p => p.type.includes('Wakil Kepala Sekolah'));

  return {
    data,
    settings,
    pimpinan,
    boxes,
    isLoading,
    error,
    groupedPimpinan,
    kepalaSekolah,
    wakilKepalaSekolah,
    refreshData
  };
}

// Hook khusus untuk mengambil data berdasarkan tipe
export function usePimpinanSMPByType(type: string) {
  const [pimpinan, setPimpinan] = useState<PimpinanSMP[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPimpinanByType = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await pimpinanSMPService.getPimpinanByType(type);
        setPimpinan(pimpinanSMPService.sortPimpinanByOrder(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data');
        console.error(`Error fetching pimpinan by type ${type}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    if (type) {
      fetchPimpinanByType();
    }
  }, [type]);

  return { pimpinan, isLoading, error };
}

// Hook khusus untuk mengambil data kepala sekolah
export function useKepalaSekolah() {
  const [kepalaSekolah, setKepalaSekolah] = useState<PimpinanSMP[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKepalaSekolah = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await pimpinanSMPService.getKepalaSekolah();
        setKepalaSekolah(pimpinanSMPService.sortPimpinanByOrder(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data kepala sekolah');
        console.error('Error fetching kepala sekolah:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKepalaSekolah();
  }, []);

  return { kepalaSekolah, isLoading, error };
}

// Hook khusus untuk mengambil data wakil kepala sekolah
export function useWakilKepalaSekolah() {
  const [wakilKepalaSekolah, setWakilKepalaSekolah] = useState<PimpinanSMP[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWakilKepalaSekolah = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await pimpinanSMPService.getWakilKepalaSekolah();
        setWakilKepalaSekolah(pimpinanSMPService.sortPimpinanByOrder(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data wakil kepala sekolah');
        console.error('Error fetching wakil kepala sekolah:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWakilKepalaSekolah();
  }, []);

  return { wakilKepalaSekolah, isLoading, error };
} 