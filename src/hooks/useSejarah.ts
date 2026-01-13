// src/hooks/useSejarah.ts
// Custom hooks untuk mengelola state dan data fetching sejarah singkat

import { useState, useEffect } from 'react';
import { sejarahService, SejarahSingkat, SejarahSingkatSettings, SejarahSingkatComplete } from '@/services/sejarahService';

// Hook untuk mendapatkan complete data sejarah singkat
export function useSejarah() {
  const [data, setData] = useState<SejarahSingkatComplete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await sejarahService.getCompleteSejarahSingkat();
        
        // Sort content berdasarkan order_index
        const sortedContent = sejarahService.sortSejarahSingkatByOrder(result.content);
        setData({
          ...result,
          content: sortedContent
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Hook untuk mendapatkan settings saja
export function useSejarahSettings() {
  const [settings, setSettings] = useState<SejarahSingkatSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await sejarahService.getSejarahSingkatSettings();
        setSettings(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil pengaturan');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

// Hook untuk mendapatkan content saja
export function useSejarahContent() {
  const [content, setContent] = useState<SejarahSingkat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await sejarahService.getAllSejarahSingkat();
        const sortedContent = sejarahService.sortSejarahSingkatByOrder(result);
        setContent(sortedContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil konten');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}

// Hook untuk mendapatkan content berdasarkan grid type
export function useSejarahByGridType(gridType: string) {
  const [content, setContent] = useState<SejarahSingkat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await sejarahService.getSejarahSingkatByGridType(gridType);
        const sortedContent = sejarahService.sortSejarahSingkatByOrder(result);
        setContent(sortedContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil konten');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [gridType]);

  return { content, loading, error };
}

// Hook untuk mendapatkan content dengan list items
export function useSejarahWithListItems() {
  const [content, setContent] = useState<SejarahSingkat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await sejarahService.getSejarahSingkatWithListItems();
        const sortedContent = sejarahService.sortSejarahSingkatByOrder(result);
        setContent(sortedContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil konten');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
} 