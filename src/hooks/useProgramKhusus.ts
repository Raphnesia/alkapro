import { useState, useEffect } from 'react'
import programKhususService, { ProgramKhususItem, ProgramKhususSettings } from '@/services/programKhususService'

export const useProgramKhusus = () => {
  const [programs, setPrograms] = useState<ProgramKhususItem[]>([])
  const [settings, setSettings] = useState<ProgramKhususSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const data = await programKhususService.getPrograms()
      setPrograms(data)
      // Use default settings as fallback
      setSettings(programKhususService.getDefaultSettings())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch programs')
      // Use default settings and empty programs as fallback
      setSettings(programKhususService.getDefaultSettings())
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  return {
    programs,
    settings,
    loading,
    error,
    refetch: fetchPrograms
  }
}

// Hook khusus untuk HOME page - mengambil konten keunggulan/materi (order_index < 10)
export const useProgramKhususHome = () => {
  const [programs, setPrograms] = useState<ProgramKhususItem[]>([])
  const [settings, setSettings] = useState<ProgramKhususSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHomePrograms = async () => {
    try {
      setLoading(true)
      const data = await programKhususService.getHomePrograms()
      setPrograms(data)
      // Use default settings as fallback
      setSettings(programKhususService.getDefaultSettings())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch home programs')
      // Use default settings and empty programs as fallback
      setSettings(programKhususService.getDefaultSettings())
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHomePrograms()
  }, [])

  return {
    programs,
    settings,
    loading,
    error,
    refetch: fetchHomePrograms
  }
}

export const useProgramKhususByType = (type: 'tahfidz' | 'ict') => {
  const [programs, setPrograms] = useState<ProgramKhususItem[]>([])
  const [settings, setSettings] = useState<ProgramKhususSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Try to use the new complete API endpoint first
      try {
        const completeData = await programKhususService.getCompleteByType(type)
        setSettings(completeData.settings)
        setPrograms(completeData.items)
      } catch (completeError) {
        console.warn(`Complete API failed for ${type}, falling back to separate calls:`, completeError)
        // Fallback to separate calls
        const data = await programKhususService.getPrograms(type)
        setPrograms(data)
        setSettings(programKhususService.getDefaultSettings(type))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch ${type} data`)
      console.error(`Error fetching ${type} data:`, err)
      // Use default settings and empty programs as fallback
      setSettings(programKhususService.getDefaultSettings(type))
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [type])

  return {
    programs,
    settings,
    loading,
    error,
    refetch: fetchData
  }
}

// Hook khusus untuk HALAMAN PROGRAM KHUSUS - mengambil detail program (order_index >= 10)
export const useProgramKhususPage = () => {
  const [programs, setPrograms] = useState<ProgramKhususItem[]>([])
  const [settings, setSettings] = useState<ProgramKhususSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPagePrograms = async () => {
    try {
      setLoading(true)
      const data = await programKhususService.getProgramKhususPagePrograms()
      setPrograms(data)
      // Use default settings as fallback
      setSettings(programKhususService.getDefaultSettings())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch page programs')
      // Use default settings and empty programs as fallback
      setSettings(programKhususService.getDefaultSettings())
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPagePrograms()
  }, [])

  return {
    programs,
    settings,
    loading,
    error,
    refetch: fetchPagePrograms
  }
}

// Note: Slug-based fetching is not available in current API
// Programs can be accessed by type (tahfidz/ict) instead