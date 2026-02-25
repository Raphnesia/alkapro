import { useState, useEffect } from 'react'
import { alkaproLibraryApi, AlkaproLibraryData } from '@/lib/alkapro-library-api'

interface UseAlkaproLibraryReturn {
  data: AlkaproLibraryData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useAlkaproLibrary(): UseAlkaproLibraryReturn {
  const [data, setData] = useState<AlkaproLibraryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 Fetching Alkapro Library data from API...')
      const result = await alkaproLibraryApi.getComplete()
      
      if (result) {
        console.log('✅ Alkapro Library data loaded successfully:', result)
        setData(result)
      } else {
        console.log('⚠️ No Alkapro Library data received, using fallback')
        setData(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('❌ Error fetching Alkapro Library data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Hook untuk gallery saja
export function useAlkaproGallery() {
  const [gallery, setGallery] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        const result = await alkaproLibraryApi.getGallery()
        setGallery(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching Alkapro Library gallery:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  return { gallery, loading, error }
}

// Hook untuk pamphlets saja
export function useAlkaproPamphlets() {
  const [pamphlets, setPamphlets] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPamphlets = async () => {
      try {
        setLoading(true)
        const result = await alkaproLibraryApi.getPamphlets()
        setPamphlets(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching Alkapro Library pamphlets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPamphlets()
  }, [])

  return { pamphlets, loading, error }
}
