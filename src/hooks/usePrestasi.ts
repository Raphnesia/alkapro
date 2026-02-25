// src/hooks/usePrestasi.ts
import { useEffect, useState } from 'react'
import { prestasiService, PrestasiComplete } from '@/services/prestasiService'

export function usePrestasi() {
  const [data, setData] = useState<PrestasiComplete | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await prestasiService.getCompleteData()
        
        // Debug: Log data yang dikirim ke komponen
        console.log('🔍 Hook Data Result:', res)
        console.log('🔍 Hook Settings:', res?.settings)
        console.log('🔍 Hook Right Image:', res?.right_image)
        console.log('🔍 Hook Prestasi Count:', res?.list_prestasi?.length)
        console.log('🔍 Hook Tahfidz Count:', res?.list_tahfidz?.length)
        
        if (res) setData(res)
      } catch (e) {
        setError('Gagal memuat data Prestasi')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await prestasiService.getCompleteData()
      if (res) setData(res)
      else setError('Gagal memuat data Prestasi')
    } catch (e) {
      setError('Terjadi kesalahan saat memuat data Prestasi')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
} 