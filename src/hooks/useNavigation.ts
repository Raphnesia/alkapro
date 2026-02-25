import { useState, useEffect } from 'react';
import { navigationApi, HeaderData, FooterData } from '@/services/navigationService';

export const useHeader = () => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await navigationApi.getHeader();
        setHeaderData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch header data');
        console.error('Error in useHeader:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, []);

  return { headerData, loading, error };
};

export const useFooter = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await navigationApi.getFooter();
        setFooterData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch footer data');
        console.error('Error in useFooter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  return { footerData, loading, error };
}; 